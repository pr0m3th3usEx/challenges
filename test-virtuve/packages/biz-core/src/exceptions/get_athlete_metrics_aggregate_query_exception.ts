import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthleteMetricsAggregateQueryError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
  ComputationImpossible = 'ComputationImpossible',
}

export class GetAthleteMetricsAggregateQueryException extends Error {
  constructor(
    private readonly error: GetAthleteMetricsAggregateQueryError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case GetAthleteMetricsAggregateQueryError.AthleteNotFound:
        return 404;
      case GetAthleteMetricsAggregateQueryError.ServiceError:
        return 500;
      case GetAthleteMetricsAggregateQueryError.ComputationImpossible:
        return 400;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case GetAthleteMetricsAggregateQueryError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case GetAthleteMetricsAggregateQueryError.ServiceError:
        return undefined;
      case GetAthleteMetricsAggregateQueryError.ComputationImpossible:
        return { message: 'minmax requires at least 1 value' };
    }
  }
}
