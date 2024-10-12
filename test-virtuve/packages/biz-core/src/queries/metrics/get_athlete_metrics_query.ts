import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { MetricRepository } from 'src/contracts/repositories/metric_repository';
import { Metric } from 'src/entities/metric';
import { MetricType } from 'src/value_objects/metric_type';

export interface GetAthleteMetricsQueryOptions {
  metricType?: MetricType;
  start?: Date;
  end?: Date;
}

// TODO Create custom exception for query

export class GetAthleteMetricsQuery {
  constructor(
    private readonly athleteId: string,
    private readonly options: GetAthleteMetricsQueryOptions,
  ) {}

  async execute(athlete_repository: AthleteRepository, metric_repository: MetricRepository): Promise<Metric[]> {
    const athlete = await athlete_repository.get(this.athleteId).catch((_) => {
      throw new Error('Service error');
    });

    if (!athlete) throw new Error('Athlete not found');

    const metrics = await metric_repository
      .getAthleteMetrics(this.athleteId, {
        page: 1,
        limit: 10000,
        metricType: this.options.metricType,
        start: this.options.start,
        end: this.options.end,
      })
      .catch((_) => {
        throw new Error('Service error');
      });

    return metrics;
  }
}
