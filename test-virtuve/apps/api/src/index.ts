import { serve } from '@hono/node-server';
import { Hono } from 'hono';
// import config from './config/index';
import athleteRoutes from './routes/athletes';
import metricsRoutes from './routes/metrics';

const app = new Hono();

app.route('/', athleteRoutes);
app.route('/', metricsRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
