import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Metric } from '../../entities/metric.js';
import { MetricType } from '../../value_objects/metric_type.js';
import { mean, standardDeviation } from '../../utils/math.js';

export interface GetAthleteMetricsAggregateQueryOptions {
  metricType?: MetricType;
  operation: AthleteMetricsAggregateOperation;
}

export enum AthleteMetricsAggregateOperation {
  AVERAGE = 'average',
  MINMAX = 'minmax',
  SD = 'standard_deviation',
  TOTAL_COUNT = 'total',
}

export interface MinMaxResult {
  min: number;
  max: number;
}

export interface AverageResult {
  value: number;
}

export type TotalCountResult = AverageResult;

export type StandardDeviationResult = AverageResult;

export type AggregatationResult = MinMaxResult | AverageResult | TotalCountResult | StandardDeviationResult;

export interface GetAthleteMetricsAggregateQueryResponse {
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
        if (!(metric.metricType in acc)) {
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
