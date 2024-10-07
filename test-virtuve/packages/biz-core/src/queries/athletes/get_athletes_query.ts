import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { Athlete } from 'src/entities/athlete';

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
