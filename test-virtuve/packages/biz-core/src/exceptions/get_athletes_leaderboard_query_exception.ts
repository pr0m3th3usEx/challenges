import { ATHLETE_ENTITY_NAME } from '../entities/athlete.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthletesLeaderboardQueryError {
  AthleteNotFound = 'AthleteNotFound',
  ServiceError = 'ServiceError',
}

export class GetAthletesLeaderboardQueryException extends Error {
  constructor(
    private readonly error: GetAthletesLeaderboardQueryError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case GetAthletesLeaderboardQueryError.AthleteNotFound:
        return 404;
      case GetAthletesLeaderboardQueryError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case GetAthletesLeaderboardQueryError.AthleteNotFound:
        return { entity: ATHLETE_ENTITY_NAME };
      case GetAthletesLeaderboardQueryError.ServiceError:
        return undefined;
    }
  }
}
