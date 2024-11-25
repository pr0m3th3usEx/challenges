import env from 'env-var';

export const DATABASE_URL = env.get('DATABASE_URL').asUrlString();
export const PORT = env.get('PORT').default(3000).asPortNumber();
export const GCP_PROJECT_ID = env.get('GCP_PROJECT_ID').asString();
export const GCP_BUCKET_NAME = env.get('GCP_BUCKET_NAME').asString();

export const DEFAULT_IMG_URL_EXPIRATION_MILLIS = 60 * 60 * 1000; // 60 minutes
