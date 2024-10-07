import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { MetricRepository } from 'src/contracts/repositories/metric_repository';
import { Athlete } from 'src/entities/athlete';
import { Metric } from 'src/entities/metric';

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
