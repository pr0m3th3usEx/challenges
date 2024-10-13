import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum UpdateAthleteCommandError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
}

export class UpdateAthleteCommandException extends Error {
  constructor(
    private readonly error: UpdateAthleteCommandError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case UpdateAthleteCommandError.AthleteNotFound:
        return 404;
      case UpdateAthleteCommandError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case UpdateAthleteCommandError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case UpdateAthleteCommandError.ServiceError:
        return undefined;
    }
  }
}
