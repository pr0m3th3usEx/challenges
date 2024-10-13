import {
  DeleteAthleteCommandError,
  DeleteAthleteCommandException,
} from '../../exceptions/delete_athlete_command_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';

export class DeleteAthleteCommand {
  constructor(private readonly athleteId: string) {}

  async execute(athlete_repository: AthleteRepository): Promise<void> {
    if (
      !(await athlete_repository.get(this.athleteId).catch((err) => {
        throw new DeleteAthleteCommandException(DeleteAthleteCommandError.ServiceError, err);
      }))
    ) {
      throw new DeleteAthleteCommandException(
        DeleteAthleteCommandError.AthleteNotFound,
        `Athlete not found: ${this.athleteId}`,
      );
    }

    try {
      await athlete_repository.delete(this.athleteId);
    } catch (err) {
      throw new DeleteAthleteCommandException(DeleteAthleteCommandError.ServiceError, err);
    }
  }
}
