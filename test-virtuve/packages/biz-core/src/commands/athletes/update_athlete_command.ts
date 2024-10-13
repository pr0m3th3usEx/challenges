import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { Athlete } from '../../entities/athlete.js';
import { isDeepStrictEqual } from 'util';

// TODO Create custom exception for DeleteCommand

export class UpdateAthleteCommand {
  constructor(private readonly data: Athlete) {}

  async execute(athlete_repository: AthleteRepository): Promise<void> {
    const old = athlete_repository.get(this.data.id).catch(() => {
      throw new Error('ServiceError');
    });

    if (!old) {
      throw new Error('Athlete not found');
    }

    if (isDeepStrictEqual(this.data, old)) {
      return;
    }

    try {
      athlete_repository.save(this.data);
    } catch (_err) {
      throw new Error('ServiceError');
    }
  }
}
