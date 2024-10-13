/* eslint-disable @typescript-eslint/no-explicit-any */
export enum SaveAthleteCommandError {
  ServiceError,
}

export class SaveAthleteCommandException extends Error {
  constructor(
    private readonly error: SaveAthleteCommandError,
    err: unknown,
  ) {
    super(`${err}`);

    this.name = error.toString();
    Error.captureStackTrace(this, this.constructor);
  }

  getStatus(): number {
    switch (this.error) {
      case SaveAthleteCommandError.ServiceError:
        return 500;
    }
  }

  getErrorData(): any {
    switch (this.error) {
      case SaveAthleteCommandError.ServiceError:
        return undefined;
    }
  }
}
