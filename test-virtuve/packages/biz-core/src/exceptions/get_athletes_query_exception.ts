/* eslint-disable @typescript-eslint/no-explicit-any */
export enum GetAthletesQueryError {
  ServiceError,
}

export class GetAthletesQueryException extends Error {
  constructor(
    private readonly error: GetAthletesQueryError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case GetAthletesQueryError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case GetAthletesQueryError.ServiceError:
        return undefined;
    }
  }
}
