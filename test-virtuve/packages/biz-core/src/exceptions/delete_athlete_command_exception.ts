import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum DeleteAthleteCommandError {
  AlthleteNotFound,
  ServiceError,
}

export class DeleteAthleteCommandException extends Error {
  constructor(
    private readonly error: DeleteAthleteCommandError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case DeleteAthleteCommandError.AlthleteNotFound:
        return 404;
      case DeleteAthleteCommandError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case DeleteAthleteCommandError.AlthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case DeleteAthleteCommandError.ServiceError:
        return undefined;
    }
  }
}
