import { Hono } from 'hono';
import { CreateAthleteDto, GetAthleteQueryDto } from 'src/dto/athlete.dto';
import { classValidator } from 'src/middleware/classValidator';

const athleteRoutes = new Hono().basePath('/athletes');

/**
 * POST /athletes : Create a new athlete in the system.
 */
athleteRoutes.post('/', classValidator('json', CreateAthleteDto), async (context) => {
  const { data } = context.req.valid('json');

  return context.text('Hello world', 201);
});

/**
 * GET /athletes : Retrieve a list of all athletes.
 */
athleteRoutes.get('/', async (res) => {
  return res.status(200);
});

/**
 * GET /athletes/{id} : Get details and performance metrics for a specific athlete.
 */
athleteRoutes.get(':id', classValidator('param', GetAthleteQueryDto), async (context) => {
  const { data } = context.req.valid('param');

  console.log(data);

  return context.text('Hey', 200);
});

/**
 * PUT /athletes/{id} : Update an athlete’s information.
 */
athleteRoutes.put(':id', classValidator('param', GetAthleteQueryDto), async (res) => {
  return res.status(200);
});

/**
 * PUT /athletes/{id} : Update an athlete’s information.
 */
athleteRoutes.delete(':id', classValidator('param', GetAthleteQueryDto), async (res) => {
  return res.status(200);
});

export default athleteRoutes;
