import {
  UpdateAthleteCommandError,
  UpdateAthleteCommandException,
} from '../../exceptions/update_athlete_command_exception.js';
import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { Athlete } from '../../entities/athlete.js';
import { isDeepStrictEqual } from 'util';

export class UpdateAthleteCommand {
  constructor(private readonly data: Athlete) {}

  async execute(athlete_repository: AthleteRepository): Promise<void> {
    const old = await athlete_repository.get(this.data.id).catch((err) => {
      throw new UpdateAthleteCommandException(UpdateAthleteCommandError.ServiceError, err);
    });

    if (!old) {
      throw new UpdateAthleteCommandException(
        UpdateAthleteCommandError.AthleteNotFound,
        `Athlete not found: ${this.data.id}`,
      );
    }

    if (isDeepStrictEqual(this.data, old)) {
      return;
    }

    try {
      await athlete_repository.save(this.data);
    } catch (err) {
      throw new UpdateAthleteCommandException(UpdateAthleteCommandError.ServiceError, err);
    }
  }
}
