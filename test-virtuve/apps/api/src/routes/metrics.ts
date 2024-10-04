import { Hono } from 'hono';

const metricsRoutes = new Hono();

/**
 * POST /athletes/{id}/metrics : Add a new performance metric for a specific
 * athlete.
 */
metricsRoutes.post('/athletes/:id/metrics', async (res) => {
  return res.status(200);
});

/**
 * GET /athletes/{id}/metrics : Retrieve the performance metrics for a specific
 * athlete, with the option to filter by metricType and a date range.
 */
metricsRoutes.get('/athletes/:id/metrics', async (res) => {
  return res.status(200);
});

/**
 * GET /athletes/{id}/metrics/aggregate : Retrieve aggregate statistics for an
 * athlete’s performance metrics.
 */
metricsRoutes.get('/athletes/:id/metrics/aggregate', async (res) => {
  return res.status(200);
});

/**
 * GET /metrics/leaderboard : Retrieve a leaderboard of athletes ranked by the
 * highest average value for a specified metric type.
 */
metricsRoutes.get('/metrics/leaderboard', async (res) => {
  return res.status(200);
});

export default metricsRoutes;
