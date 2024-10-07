import { AthleteRepository } from 'src/contracts/repositories/athlete_repository';

// TODO Create custom exception for DeleteCommand

export class DeleteAthleteCommand {
  constructor(private readonly athleteId: string) {}

  async execute(athlete_repository: AthleteRepository): Promise<void> {
    if (
      await athlete_repository.get(this.athleteId).catch(() => {
        throw new Error('Service error');
      })
    ) {
      throw new Error('Athlete not found');
    }

    try {
      await athlete_repository.delete(this.athleteId);
    } catch (_err) {
      throw new Error('Service error');
    }
  }
}
