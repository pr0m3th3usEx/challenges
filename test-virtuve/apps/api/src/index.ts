import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import config from './config/index.js';
import { cors } from 'hono/cors';
import athleteRoutes from './routes/athletes.js';
import metricsRoutes from './routes/metrics.js';

const app = new Hono();

app.use(
  cors({
    origin: config.cors.allowed_origins,
    allowMethods: config.cors.allowed_methods,
    allowHeaders: config.cors.allowed_headers,
    credentials: true,
  }),
);

app.route('/', athleteRoutes);
app.route('/', metricsRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
