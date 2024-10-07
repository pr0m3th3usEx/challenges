/* eslint-disable @typescript-eslint/no-explicit-any */
import { validator } from 'hono/validator';
import { ClassConstructor } from 'class-transformer';
import { parseAndValidateDto } from 'src/utils/validator';
import { StatusCodes } from 'http-status-codes';
import { ValidationTargets } from 'hono';

export const classValidator = <T extends ClassConstructor<any>>(target: keyof ValidationTargets, dataType: T) =>
  validator('json', async (value, c) => {
    try {
      const body = await parseAndValidateDto(dataType, value);
      return { body };
    } catch (err) {
      return c.json(
        {
          message: (err as unknown as TypeError).message,
        },
        StatusCodes.BAD_REQUEST,
      );
    }
  });
