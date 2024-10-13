import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthleteDetailQueryError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
}

export class GetAthleteDetailQueryException extends Error {
  constructor(
    private readonly errorType: GetAthleteDetailQueryError,
    private readonly cause: unknown,
  ) {
    super(errorType);

    this.name = errorType.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.errorType) {
      case GetAthleteDetailQueryError.AthleteNotFound:
        return 404;
      case GetAthleteDetailQueryError.ServiceError:
        return 500;
    }
  }

  getErrorType() {
    return this.errorType;
  }

  getError() {
    return this.cause;
  }

  getErrorData(): any {
    switch (this.errorType) {
      case GetAthleteDetailQueryError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case GetAthleteDetailQueryError.ServiceError:
        return undefined;
    }
  }
}
