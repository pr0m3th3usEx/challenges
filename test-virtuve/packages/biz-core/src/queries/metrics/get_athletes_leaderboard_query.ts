import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { MetricRepository } from 'src/contracts/repositories/metric_repository';
import { Athlete } from 'src/entities/athlete';
import { Metric } from 'src/entities/metric';
import { MetricType } from 'src/value_objects/metric_type';

interface GetAthletesLeaderboardOptions {
  metricType: MetricType;
  limit?: number;
}

interface GetAthletesLeaderboardResponse {
  athletes: (Athlete & { avgValue: number })[];
}

// TODO Create custom exception for query

export class GetAthletesLeaderboard {
  constructor(private readonly options: GetAthletesLeaderboardOptions) {}

  async execute(
    athlete_repository: AthleteRepository,
    metrics_repository: MetricRepository,
  ): Promise<GetAthletesLeaderboardResponse> {
    const limit = this.options.limit ?? 10;

    const metrics = await metrics_repository
      .getAll({
        page: 1,
        limit: 10000,
        metricType: this.options.metricType,
      })
      .catch((_) => {
        throw new Error('Service error');
      });

    // Group metrics by athlete
    const metricsByAthletes = metrics.reduce((acc: Record<string, Metric[]>, metric) => {
      if (metric.athleteId in acc) {
        acc[metric.athleteId] = [];
      }

      acc[metric.athleteId].push(metric);

      return acc;
    }, {});

    // - Compute average value for each athletes
    // - Sort desc (highest average value first)
    // - Get only `limit` first
    const highestAverageValues = Object.entries(metricsByAthletes)
      .map(([athleteId, athleteMetrics]) => {
        return {
          athleteId,
          avgValue: athleteMetrics.reduce((acc, { value }) => acc + value, 0) / athleteMetrics.length, // Average computation
        };
      })
      .sort((a, b) => b.avgValue - a.avgValue)
      .slice(0, limit);

    // Find athletes
    const promises = highestAverageValues.map(async ({ athleteId, avgValue }) => {
      const athlete = await athlete_repository.get(athleteId).catch((_) => {
        throw new Error('Service error');
      });

      if (!athlete) {
        throw new Error('Athlete not found');
      }

      return {
        ...athlete,
        avgValue,
      };
    });

    const athletesWithAvgValues = await Promise.all(promises);

    return {
      athletes: athletesWithAvgValues,
    };
  }
}
