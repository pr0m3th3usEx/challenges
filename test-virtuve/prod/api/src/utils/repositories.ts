import { PrismaClient } from '@virtuve/prisma-db-adapter/client';
import { PrismaAthleteRepository } from '@virtuve/prisma-db-adapter/athlete_repository';
import { PrismaMetricRepository } from '@virtuve/prisma-db-adapter/metric_repository';

const client = new PrismaClient();

export const athleteRepository = new PrismaAthleteRepository(client);
export const metricRepository = new PrismaMetricRepository(client);
