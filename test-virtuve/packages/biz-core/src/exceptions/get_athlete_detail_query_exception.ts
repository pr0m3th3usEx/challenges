import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthleteDetailQueryError {
  AlthleteNotFound,
  ServiceError,
}

export class GetAthleteDetailQueryException extends Error {
  constructor(
    private readonly error: GetAthleteDetailQueryError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case GetAthleteDetailQueryError.AlthleteNotFound:
        return 404;
      case GetAthleteDetailQueryError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case GetAthleteDetailQueryError.AlthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case GetAthleteDetailQueryError.ServiceError:
        return undefined;
    }
  }
}
