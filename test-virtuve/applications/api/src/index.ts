import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import config from './config';
import athleteRoutes from './routes/athletes';
import metricsRoutes from './routes/metrics';

const app = new Hono();

app.route('/', athleteRoutes);
app.route('/', metricsRoutes);

const port = config.gateway.port;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
