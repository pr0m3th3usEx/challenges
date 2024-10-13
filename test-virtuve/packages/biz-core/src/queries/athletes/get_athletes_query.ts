import { GetAthletesQueryError, GetAthletesQueryException } from '../../exceptions/get_athletes_query_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { Athlete } from '../../entities/athlete.js';

export class GetAthletesQuery {
  async execute(athlete_repository: AthleteRepository): Promise<Athlete[]> {
    const athletes = await athlete_repository.getAll().catch((err) => {
      throw new GetAthletesQueryException(GetAthletesQueryError.ServiceError, err);
    });

    return athletes;
  }
}
