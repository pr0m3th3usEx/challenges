import env from 'env-var';

const config = {
  redis: {
    host: env.get('REDIS_HOST').default('localhost').asString(),
    port: env.get('REDIS_PORT').default(6379).asPortNumber(),
  },
  gateway: {
    port: env.get('API_PORT').default(3000).asPortNumber(),
  },
  cors: {
    allowed_origins: env.get('CORS_ALLOWED_ORIGINS').default('*').asArray(','),
    allowed_headers: env.get('CORS_ALLOWED_HEADERS').default('*').asArray(','),
    allowed_methods: env.get('CORS_ALLOWED_METHODS').default('*').asArray(','),
  }
};

export default config;