import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { Athlete } from '../../entities/athlete.js';

// TODO create custom exception query
// TODO Add pagination

export class GetAthletesQuery {
  async execute(athlete_repository: AthleteRepository): Promise<Athlete[]> {
    const athletes = await athlete_repository.getAll().catch((_) => {
      throw new Error('Service error');
    });

    return athletes;
  }
}
