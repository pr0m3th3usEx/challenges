import {
  GetAthleteDetailQueryError,
  GetAthleteDetailQueryException,
} from '../../exceptions/get_athlete_detail_query_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Athlete } from '../../entities/athlete.js';
import { Metric } from '../../entities/metric.js';

export interface GetAthleteDetailQueryResponse extends Athlete {
  metrics: Metric[];
}

export class GetAthleteDetailQuery {
  constructor(private readonly athleteId: string) {}

  async execute(
    athlete_repository: AthleteRepository,
    metric_repository: MetricRepository,
  ): Promise<GetAthleteDetailQueryResponse> {
    const athlete = await athlete_repository.get(this.athleteId).catch((err) => {
      throw new GetAthleteDetailQueryException(GetAthleteDetailQueryError.ServiceError, err);
    });

    if (!athlete)
      throw new GetAthleteDetailQueryException(
        GetAthleteDetailQueryError.AlthleteNotFound,
        `Athlete not found: ${this.athleteId}`,
      );

    const metrics = await metric_repository.getAthleteMetrics(this.athleteId).catch((err) => {
      throw new GetAthleteDetailQueryException(GetAthleteDetailQueryError.ServiceError, err);
    });

    return {
      ...athlete,
      metrics,
    };
  }
}
