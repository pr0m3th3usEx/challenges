import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Athlete } from '../../entities/athlete.js';
import { Metric } from '../../entities/metric.js';

export interface GetAthleteDetailQueryResponse extends Athlete {
  metrics: Metric[];
}

// TODO Create custom exception for query

export class GetAthleteDetailQuery {
  constructor(private readonly athleteId: string) {}

  async execute(
    athlete_repository: AthleteRepository,
    metric_repository: MetricRepository,
  ): Promise<GetAthleteDetailQueryResponse> {
    const athlete = await athlete_repository.get(this.athleteId).catch((_) => {
      throw new Error('Service error');
    });

    if (!athlete) throw new Error('Athlete not found');

    const metrics = await metric_repository.getAthleteMetrics(this.athleteId).catch((_) => {
      throw new Error('Service error');
    });

    return {
      ...athlete,
      metrics,
    };
  }
}
