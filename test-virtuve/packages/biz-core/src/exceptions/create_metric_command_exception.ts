import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum CreateMetricCommandError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
}

export class CreateMetricCommandException extends Error {
  constructor(
    private readonly error: CreateMetricCommandError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case CreateMetricCommandError.AthleteNotFound:
        return 404;
      case CreateMetricCommandError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case CreateMetricCommandError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case CreateMetricCommandError.ServiceError:
        return undefined;
    }
  }
}
