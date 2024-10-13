import {
  GetAthleteMetricsQueryError,
  GetAthleteMetricsQueryException,
} from '../../exceptions/get_athlete_metrics_query_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Metric } from '../../entities/metric.js';
import { MetricType } from '../../value_objects/metric_type.js';

export interface GetAthleteMetricsQueryOptions {
  metricType?: MetricType;
  start?: Date;
  end?: Date;
}

export class GetAthleteMetricsQuery {
  constructor(
    private readonly athleteId: string,
    private readonly options: GetAthleteMetricsQueryOptions,
  ) {}

  async execute(athlete_repository: AthleteRepository, metric_repository: MetricRepository): Promise<Metric[]> {
    const athlete = await athlete_repository.get(this.athleteId).catch((err) => {
      throw new GetAthleteMetricsQueryException(GetAthleteMetricsQueryError.ServiceError, err);
    });

    if (!athlete)
      throw new GetAthleteMetricsQueryException(
        GetAthleteMetricsQueryError.AthleteNotFound,
        `Athlete not found: ${this.athleteId}`,
      );

    const metrics = await metric_repository
      .getAthleteMetrics(this.athleteId, {
        page: 1,
        limit: 10000,
        metricType: this.options.metricType,
        start: this.options.start,
        end: this.options.end,
      })
      .catch((err) => {
        throw new GetAthleteMetricsQueryException(GetAthleteMetricsQueryError.ServiceError, err);
      });

    return metrics;
  }
}
