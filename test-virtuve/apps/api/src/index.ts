import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import config from './config/index.js';
import { cors } from 'hono/cors';
import athleteRoutes from './routes/athletes.js';
import metricsRoutes from './routes/metrics.js';
import { requestId } from 'hono/request-id';
import customLogger from './utils/logger.js';
import { v4 } from 'uuid';

const app = new Hono();

app.use(
  cors({
    origin: config.cors.allowed_origins,
    allowMethods: config.cors.allowed_methods,
    allowHeaders: config.cors.allowed_headers,
    credentials: true,
  }),
);
app.use(
  requestId({
    generator: () => v4(),
  }),
);

app.use(customLogger);

// Logger
// Request ID
// Caching (Redis)
// Deployment (Docker, Terraform)
// Monitoring (Grafana, Prometheus)
// Documentation (Swagger, Readme)
// Testing (Validation tests)

app.route('/', athleteRoutes);
app.route('/', metricsRoutes);

console.log(`Server is running on port ${config.gateway.port}`);

serve({
  fetch: app.fetch,
  port: config.gateway.port,
});
