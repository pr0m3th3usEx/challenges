import { v4 } from 'uuid';
import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';
import { Athlete } from 'src/entities/athlete';

// TODO Create custom exception for command

export class SaveAtlheteCommand {
  constructor(
    private readonly name: string,
    private readonly age: number,
    private readonly team: string,
  ) {}

  async execute(athlete_repository: AthleteRepository): Promise<string /** id */> {
    const athlete: Athlete = {
      id: v4(),
      name: this.name,
      age: this.age,
      team: this.team,
    };

    try {
      const { id: athleteId } = await athlete_repository.save(athlete);

      return athleteId;
    } catch (_err) {
      throw new Error('Service Error');
    }
  }
}
