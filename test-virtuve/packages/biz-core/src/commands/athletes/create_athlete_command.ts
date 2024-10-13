import { v4 } from 'uuid';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { Athlete } from '../../entities/athlete.js';
import {
  SaveAthleteCommandError,
  SaveAthleteCommandException,
} from '../../exceptions/save_athlete_command_exception.js';

export class SaveAthleteCommand {
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
    } catch (err: unknown) {
      throw new SaveAthleteCommandException(SaveAthleteCommandError.ServiceError, err);
    }
  }
}
