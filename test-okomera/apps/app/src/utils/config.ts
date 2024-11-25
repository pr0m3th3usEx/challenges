import env from 'env-var';

export default {
  apiGatewayUrl: env.get('VITE_API_GATEWAY').default('http://localhost:3000').asUrlString(),
};
