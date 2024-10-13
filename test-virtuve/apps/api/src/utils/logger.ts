import { createMiddleware } from 'hono/factory';
import winston from 'winston';
import 'winston-daily-rotate-file';
import prettyMilliseconds from 'pretty-ms';
import config from '../config/index.js';
import { CustomHttpException } from '../exception/http_exception.js';

const { combine, timestamp, colorize, printf } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: config.gateway.logLevel,
  transports: [
    new winston.transports.Console({
      forceConsole: true,
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        printf(({ level, timestamp, durationMs, message, ...other }) => {
          // When request done
          const duration = durationMs
            ? prettyMilliseconds(durationMs, { keepDecimalsOnWholeSeconds: true })
            : undefined;
          return `[${timestamp}] ${level}: ${message} - ${JSON.stringify({ ...other, duration })}`;
        }),
      ),
    }),
    fileRotateTransport,
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' })],
});

const customLogger = createMiddleware(async (context, next) => {
  const profile = logger.startTimer();

  profile.logger.info('IN', {
    requestId: context.get('requestId'),
    method: context.req.method,
    path: context.req.path,
  });

  await next();

  if (context.error && context.error instanceof CustomHttpException) {
    console.log(context.error);
  }

  profile.done({
    level: context.error ? 'error' : 'info',
    message: 'OUT',
    requestId: context.get('requestId'),
    method: context.req.method,
    statusCode: context.res.status,
    path: context.req.path,
    ...(context.error
      ? {
          errorCode: context.error instanceof CustomHttpException ? context.error.cause?.name : context.error.name,
          data:
            context.error instanceof CustomHttpException
              ? `${JSON.stringify(context.error.cause?.error)}`
              : context.error.message,
        }
      : {}),
  });
});

export default customLogger;
