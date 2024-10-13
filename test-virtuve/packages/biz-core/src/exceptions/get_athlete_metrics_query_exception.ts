import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthleteMetricsQueryError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
}

export class GetAthleteMetricsQueryException extends Error {
  constructor(
    private readonly error: GetAthleteMetricsQueryError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case GetAthleteMetricsQueryError.AthleteNotFound:
        return 404;
      case GetAthleteMetricsQueryError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case GetAthleteMetricsQueryError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case GetAthleteMetricsQueryError.ServiceError:
        return undefined;
    }
  }
}
