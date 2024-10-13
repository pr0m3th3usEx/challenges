import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';

type HTTPExceptionOptions = {
  res?: Response;
  message?: string;
  cause?: { name: string; error?: unknown };
};

export class CustomHttpException extends HTTPException {
  readonly cause?: { name: string; error?: unknown };

  constructor(
    readonly status: StatusCode,
    options?: HTTPExceptionOptions,
  ) {
    super(status, options);
    this.cause = options?.cause;
  }
}
