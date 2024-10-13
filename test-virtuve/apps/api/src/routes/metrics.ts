import { CreateMetricCommand } from '@virtuve/biz-core/commands/metrics/create_metric_command';
import { GetAthleteMetricsAggregateQuery } from '@virtuve/biz-core/queries/metrics/get_athlete_metrics_aggregate_query';
import { GetAthleteMetricsQuery } from '@virtuve/biz-core/queries/metrics/get_athlete_metrics_query';
import { GetAthletesLeaderboardQuery } from '@virtuve/biz-core/queries/metrics/get_athletes_leaderboard_query';
import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { GetAthleteQueryDto } from '../dto/athlete.dto.js';
import {
  CreateMetricDto,
  GetAthleteMetricsAggregateQueryDto,
  GetAthleteMetricsQueryDto,
  GetAthletesLeaderboardQueryDto,
} from '../dto/metric.dto.js';
import { classValidator } from '../middleware/classValidator.js';
import { athleteRepository, metricRepository } from '../utils/repositories.js';
import {
  CreateMetricCommandException,
  GetAthleteMetricsAggregateQueryException,
  GetAthleteMetricsQueryException,
  GetAthletesLeaderboardQueryException,
} from '@virtuve/biz-core/exceptions';
import { StatusCode } from 'hono/utils/http-status';

const metricsRoutes = new Hono();

/**
 * POST /athletes/{id}/metrics : Add a new performance metric for a specific
 * athlete.
 */
metricsRoutes.post(
  '/athletes/:id/metrics',
  classValidator('param', GetAthleteQueryDto),
  classValidator('json', CreateMetricDto),
  async (context) => {
    const { data: param } = context.req.valid('param') as { data: GetAthleteQueryDto };
    const { data } = context.req.valid('json') as { data: CreateMetricDto };
    const command = new CreateMetricCommand(param.id, data.metricType, data.value, data.unit);

    try {
      const id = await command.execute(athleteRepository, metricRepository);

      return context.json({ id });
    } catch (err) {
      if (err instanceof CreateMetricCommandException) {
        return context.json(err.getErrorData(), err.getStatus() as StatusCode);
      } else {
        console.error(err);
        return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  },
);

/**
 * GET /athletes/{id}/metrics : Retrieve the performance metrics for a specific
 * athlete, with the option to filter by metricType and a date range.
 */
metricsRoutes.get(
  '/athletes/:id/metrics',
  classValidator('param', GetAthleteQueryDto),
  classValidator('query', GetAthleteMetricsQueryDto),
  async (context) => {
    const { data: param } = context.req.valid('param') as { data: GetAthleteQueryDto };
    const { data: queryArgs } = context.req.valid('query') as { data: GetAthleteMetricsQueryDto };
    const query = new GetAthleteMetricsQuery(param.id, {
      start: queryArgs.from ? new Date(queryArgs.from) : undefined,
      end: queryArgs.to ? new Date(queryArgs.to) : undefined,
      metricType: queryArgs.metricType,
    });

    try {
      const metrics = await query.execute(athleteRepository, metricRepository);

      return context.json({
        metrics,
      });
    } catch (err) {
      if (err instanceof GetAthleteMetricsQueryException) {
        return context.json(err.getErrorData(), err.getStatus() as StatusCode);
      } else {
        console.error(err);
        return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  },
);

/**
 * GET /athletes/{id}/metrics/aggregate : Retrieve aggregate statistics for an
 * athlete’s performance metrics.
 */
metricsRoutes.get(
  '/athletes/:id/metrics/aggregate',
  classValidator('param', GetAthleteQueryDto),
  classValidator('query', GetAthleteMetricsAggregateQueryDto),
  async (context) => {
    const { data: param } = context.req.valid('param') as { data: GetAthleteQueryDto };
    const { data: queryArgs } = context.req.valid('query') as { data: GetAthleteMetricsAggregateQueryDto };
    const query = new GetAthleteMetricsAggregateQuery(param.id, {
      ...queryArgs,
    });

    try {
      const results = await query.execute(athleteRepository, metricRepository);

      return context.json(results);
    } catch (err) {
      if (err instanceof GetAthleteMetricsAggregateQueryException) {
        return context.json(err.getErrorData(), err.getStatus() as StatusCode);
      } else {
        console.error(err);
        return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  },
);

/**
 * GET /metrics/leaderboard : Retrieve a leaderboard of athletes ranked by the
 * highest average value for a specified metric type.
 */
metricsRoutes.get('/metrics/leaderboard', classValidator('query', GetAthletesLeaderboardQueryDto), async (context) => {
  const { data: queryArgs } = context.req.valid('query');

  try {
    const leaderboard = await new GetAthletesLeaderboardQuery({
      ...queryArgs,
    }).execute(athleteRepository, metricRepository);

    return context.json(leaderboard);
  } catch (err) {
    if (err instanceof GetAthletesLeaderboardQueryException) {
      return context.json(err.getErrorData(), err.getStatus() as StatusCode);
    } else {
      console.error(err);
      return context.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
});

export default metricsRoutes;
