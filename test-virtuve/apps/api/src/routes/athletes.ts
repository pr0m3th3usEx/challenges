import { SaveAthleteCommand } from '@virtuve/biz-core/commands/athletes/create_athlete_command';
import { DeleteAthleteCommand } from '@virtuve/biz-core/commands/athletes/delete_athlete_command';
import { UpdateAthleteCommand } from '@virtuve/biz-core/commands/athletes/update_athlete_command';
import { GetAthleteDetailQuery } from '@virtuve/biz-core/queries/athletes/get_athlete_detail_query';
import { GetAthletesQuery } from '@virtuve/biz-core/queries/get_athletes_query';
import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { CreateAthleteDto, GetAthleteQueryDto, UpdateAthleteDto } from '../dto/athlete.dto.js';
import { classValidator } from '../middleware/classValidator.js';
import { athleteRepository, metricRepository } from '../utils/repositories.js';
import {
  DeleteAthleteCommandException,
  SaveAthleteCommandException,
  UpdateAthleteCommandException,
} from '@virtuve/biz-core/exceptions';
import { StatusCode } from 'hono/utils/http-status';

const athleteRoutes = new Hono().basePath('/athletes');

/**
 * POST /athletes : Create a new athlete in the system.
 */
athleteRoutes.post('/', classValidator('json', CreateAthleteDto), async (context) => {
  const { data } = context.req.valid('json');
  const command = new SaveAthleteCommand(data.name, data.age, data.name);

  try {
    const id = await command.execute(athleteRepository);

    return context.json({
      id,
    });
  } catch (err) {
    if (err instanceof SaveAthleteCommandException) {
      return context.json(err.getErrorData(), err.getStatus() as StatusCode);
    } else {
      console.error(err);
      return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
});

/**
 * GET /athletes : Retrieve a list of all athletes.
 */
athleteRoutes.get('/', async (context) => {
  const query = new GetAthletesQuery();

  try {
    const athletes = await query.execute(athleteRepository);

    return context.json({
      athletes,
    });
  } catch (err) {
    console.error(err);
    return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/**
 * GET /athletes/{id} : Get details and performance metrics for a specific athlete.
 */
athleteRoutes.get(':id', classValidator('param', GetAthleteQueryDto), async (context) => {
  const { data } = context.req.valid('param') as { data: GetAthleteQueryDto };
  const query = new GetAthleteDetailQuery(data.id);

  try {
    const athleteDetail = await query.execute(athleteRepository, metricRepository);

    return context.json(athleteDetail);
  } catch (err) {
    console.error(err);
    return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/**
 * PUT /athletes/{id} : Update an athlete’s information.
 */
athleteRoutes.put(
  ':id',
  classValidator('param', GetAthleteQueryDto),
  classValidator('json', UpdateAthleteDto),
  async (context) => {
    const { data: param } = context.req.valid('param') as { data: GetAthleteQueryDto };
    const { data } = context.req.valid('json') as { data: UpdateAthleteDto };
    const command = new UpdateAthleteCommand({
      id: param.id,
      ...data,
    });

    try {
      await command.execute(athleteRepository);
      return context.body(null, StatusCodes.NO_CONTENT);
    } catch (err) {
      if (err instanceof UpdateAthleteCommandException) {
        return context.json(err.getErrorData(), err.getStatus() as StatusCode);
      } else {
        console.error(err);
        return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  },
);

/**
 * DELETE /athletes/{id} : Delete an athlete
 */
athleteRoutes.delete(':id', classValidator('param', GetAthleteQueryDto), async (context) => {
  const { data: param } = context.req.valid('param');
  const command = new DeleteAthleteCommand(param.id);

  try {
    await command.execute(athleteRepository);

    return context.status(StatusCodes.NO_CONTENT);
  } catch (err) {
    if (err instanceof DeleteAthleteCommandException) {
      return context.json(err.getErrorData(), err.getStatus() as StatusCode);
    } else {
      console.error(err);
      return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
});

export default athleteRoutes;
