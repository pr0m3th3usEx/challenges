import {
  GetAthletesLeaderboardQueryError,
  GetAthletesLeaderboardQueryException,
} from '../../exceptions/get_athletes_leaderboard_query_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Athlete } from '../../entities/athlete.js';
import { Metric } from '../../entities/metric.js';
import { MetricType } from '../../value_objects/metric_type.js';

export interface GetAthletesLeaderboardOptions {
  metricType: MetricType;
  limit?: number;
}

export interface GetAthletesLeaderboardResponse {
  athletes: (Athlete & { avgValue: number })[];
}

export class GetAthletesLeaderboardQuery {
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
      .catch((err) => {
        throw new GetAthletesLeaderboardQueryException(GetAthletesLeaderboardQueryError.ServiceError, err);
      });

    // Group metrics by athlete
    const metricsByAthletes = metrics.reduce((acc: Record<string, Metric[]>, metric) => {
      if (!(metric.athleteId in acc)) {
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
      const athlete = await athlete_repository.get(athleteId).catch((err) => {
        throw new GetAthletesLeaderboardQueryException(GetAthletesLeaderboardQueryError.ServiceError, err);
      });

      if (!athlete) {
        throw new GetAthletesLeaderboardQueryException(
          GetAthletesLeaderboardQueryError.AthleteNotFound,
          `Athlete not found: ${athleteId}`,
        );
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
