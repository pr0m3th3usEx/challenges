import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { MetricRepository } from 'src/contracts/repositories/metric_repository';
import { Metric } from 'src/entities/metric';
import { mean, standardDeviation } from 'src/utils/math';
import { MetricType } from 'src/value_objects/metric_type';

interface GetAthleteMetricsAggregateQueryOptions {
  metricType?: MetricType;
  operation: AthleteMetricsAggregateOperation;
}

enum AthleteMetricsAggregateOperation {
  AVERAGE,
  MINMAX,
  SD,
  TOTAL_COUNT,
}

interface MinMaxResult {
  min: number;
  max: number;
}

interface AverageResult {
  value: number;
}

type TotalCountResult = AverageResult;

type StandardDeviationResult = AverageResult;

type AggregatationResult = MinMaxResult | AverageResult | TotalCountResult | StandardDeviationResult;

interface GetAthleteMetricsAggregateQueryResponse {
  results: {
    metricType: MetricType;
    result: AggregatationResult;
  }[];
}

// TODO Create custom exception for query

export class GetAthleteMetricsAggregateQuery {
  constructor(
    private readonly athleteId: string,
    private readonly options: GetAthleteMetricsAggregateQueryOptions,
  ) {}

  private computeAggregate(metrics: Metric[], operation: AthleteMetricsAggregateOperation): AggregatationResult {
    const data = metrics.map((metric) => metric.value);

    switch (operation) {
      case AthleteMetricsAggregateOperation.AVERAGE:
        return {
          value: mean(data),
        };
      case AthleteMetricsAggregateOperation.MINMAX:
        if (data.length === 0) throw new Error('Not computable');
        return {
          min: Math.min(...data),
          max: Math.max(...data),
        };
      case AthleteMetricsAggregateOperation.SD:
        return {
          value: standardDeviation(data),
        };
      case AthleteMetricsAggregateOperation.TOTAL_COUNT:
        return {
          value: data.length,
        };
    }
  }

  async execute(
    athlete_repository: AthleteRepository,
    metric_repository: MetricRepository,
  ): Promise<GetAthleteMetricsAggregateQueryResponse> {
    const athlete = await athlete_repository.get(this.athleteId).catch((_) => {
      throw new Error('Service error');
    });

    if (!athlete) throw new Error('Athlete not found');

    const metrics = await metric_repository
      .getAthleteMetrics(this.athleteId, {
        page: 1,
        limit: 10000,
        metricType: this.options.metricType,
      })
      .catch((_) => {
        throw new Error('Service error');
      });

    // Compute for single metric
    if (this.options.metricType) {
      try {
        const result = this.computeAggregate(metrics, this.options.operation);

        return {
          results: [
            {
              metricType: this.options.metricType,
              result,
            },
          ],
        };
      } catch (_) {
        throw new Error('Computation failed');
      }
    }

    // Compute every metric type
    // - Group by metric type
    // - Compute for each metric type
    const metricsByMetricType = metrics.reduce(
      (acc: Record<MetricType, Metric[]>, metric) => {
        if (metric.metricType in acc) {
          acc[metric.metricType] = [];
        }

        acc[metric.metricType].push(metric);

        return acc;
      },
      {} as Record<MetricType, Metric[]>,
    );

    const results = Object.entries(metricsByMetricType).map(([metricType, data]) => {
      try {
        const result = this.computeAggregate(data, this.options.operation);

        return {
          metricType: metricType as MetricType,
          result,
        };
      } catch (_) {
        throw new Error('Computation failed');
      }
    });

    return {
      results,
    };
  }
}
