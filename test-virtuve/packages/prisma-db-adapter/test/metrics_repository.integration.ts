import { test, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaMetricRepository } from '../src/metric_repository';
import { PrismaAthleteRepository } from '../src/athlete_repository';
import { createAthlete, createMetricData, parseISOString } from './factory';
import { Metric, MetricType } from '@virtuve/biz-core';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const athletes_repository = new PrismaAthleteRepository(prisma);
const metrics_repository = new PrismaMetricRepository(prisma);

test('Save a metric', async () => {
  // Save a user
  const athlete = await athletes_repository.save(createAthlete());

  const data: Metric = {
    athleteId: athlete.id,
    ...createMetricData(MetricType.SPEED, 'km/h', 10.0, 24.0),
  };

  // Save a metric for the athlete
  const metric = await metrics_repository.save(data);

  expect(metric).toStrictEqual(data);
});

test('Get a metric from id', async () => {
  // Save a user
  const athlete = await athletes_repository.save(createAthlete());

  const data: Metric = {
    athleteId: athlete.id,
    ...createMetricData(MetricType.SPEED, 'km/h', 10.0, 24.0),
  };

  // Save a metric for the athlete
  await metrics_repository.save(data);

  // Get the metric
  const metric = await metrics_repository.get(data.id);

  expect(metric).toStrictEqual(data);
});

test('Get all metrics', () => async () => {
  // Save a user
  const athlete = await athletes_repository.save(createAthlete());

  const data: Metric[] = faker.helpers.multiple(
    () => ({
      athleteId: athlete.id,
      ...createMetricData(
        faker.helpers.enumValue(MetricType),
        faker.helpers.arrayElement(['km/h', 'mph', 'kg']),
        10.0,
        24.0,
      ),
    }),
    {
      count: 120,
    },
  );

  // Create multiple metrics
  const promises = data.map(async (d) => metrics_repository.save(d));
  await Promise.all(promises);

  // Get all
  const metrics = await metrics_repository.getAll();

  expect(metrics.length).toBe(120);
});

test('Get athlete metrics', () => async () => {
  // Save multiple users
  const athlete = await athletes_repository.save(createAthlete());
  const athlete2 = await athletes_repository.save(createAthlete());

  const data: Metric[] = faker.helpers.multiple(
    () => ({
      athleteId: faker.helpers.arrayElement([athlete.id, athlete2.id]),
      ...createMetricData(
        faker.helpers.enumValue(MetricType),
        faker.helpers.arrayElement(['km/h', 'mph', 'kg']),
        10.0,
        24.0,
      ),
    }),
    {
      count: 20,
    },
  );

  const metricsAthlete2 = data.filter((d) => d.athleteId === athlete2.id);

  // Create multiple metrics
  const promises = data.map(async (d) => metrics_repository.save(d));
  await Promise.all(promises);

  // Get metrics of athlete 2
  const metricsResult = await metrics_repository.getAthleteMetrics(athlete2.id);

  expect(metricsResult.length).toBe(metricsAthlete2.length);
});

test('Get athlete metrics filtered by metric type', () => async () => {
  // Save multiple users
  const athlete = await athletes_repository.save(createAthlete());
  const athlete2 = await athletes_repository.save(createAthlete());

  const data: Metric[] = faker.helpers.multiple(
    () => ({
      athleteId: faker.helpers.arrayElement([athlete.id, athlete2.id]),
      ...createMetricData(
        faker.helpers.enumValue(MetricType),
        faker.helpers.arrayElement(['km/h', 'mph', 'kg']),
        10.0,
        24.0,
      ),
    }),
    {
      count: 20,
    },
  );

  const metricsAthlete2 = data.filter((d) => d.athleteId === athlete2.id && d.metricType === MetricType.STAMINA);

  // Create multiple metrics
  const promises = data.map(async (d) => metrics_repository.save(d));
  await Promise.all(promises);

  // Get metrics of athlete 2
  const metricsResult = await metrics_repository.getAthleteMetrics(athlete2.id, {
    limit: 10000,
    page: 1,
    metricType: MetricType.STAMINA,
  });

  expect(metricsResult.length).toBe(metricsAthlete2.length);
});

test('Get athlete metrics filtered by date range', () => async () => {
  // Save multiple users
  const athlete = await athletes_repository.save(createAthlete());
  const athlete2 = await athletes_repository.save(createAthlete());

  const data: Metric[] = faker.helpers.multiple(
    () => ({
      athleteId: faker.helpers.arrayElement([athlete.id, athlete2.id]),
      ...createMetricData(
        faker.helpers.enumValue(MetricType),
        faker.helpers.arrayElement(['km/h', 'mph', 'kg']),
        10.0,
        24.0,
        faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
      ),
    }),
    {
      count: 200,
    },
  );

  const metricsAthlete2 = data.filter(
    (d) =>
      d.athleteId === athlete2.id &&
      d.timestamp >= parseISOString('2023-01-01T00:00:00.000Z') &&
      d.timestamp < parseISOString('2026-01-01T00:00:00.000Z'),
  );

  // Create multiple metrics
  const promises = data.map(async (d) => metrics_repository.save(d));
  await Promise.all(promises);

  // Get metrics of athlete 2
  const metricsResult = await metrics_repository.getAthleteMetrics(athlete2.id, {
    limit: 10000,
    page: 1,
    start: parseISOString('2023-01-01T00:00:00.000Z'),
    end: parseISOString('2026-01-01T00:00:00.000Z'),
  });

  expect(metricsResult.length).toBe(metricsAthlete2.length);
});

test('Get athlete metrics filtered by metric type and date range', () => async () => {
  // Save multiple users
  const athlete = await athletes_repository.save(createAthlete());
  const athlete2 = await athletes_repository.save(createAthlete());

  const data: Metric[] = faker.helpers.multiple(
    () => ({
      athleteId: faker.helpers.arrayElement([athlete.id, athlete2.id]),
      ...createMetricData(
        faker.helpers.enumValue(MetricType),
        faker.helpers.arrayElement(['km/h', 'mph', 'kg']),
        10.0,
        24.0,
        faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
      ),
    }),
    {
      count: 300,
    },
  );

  const metricsAthlete2 = data.filter(
    (d) =>
      d.athleteId === athlete2.id &&
      d.metricType === MetricType.STRENGTH &&
      d.timestamp >= parseISOString('2023-01-01T00:00:00.000Z') &&
      d.timestamp < parseISOString('2026-01-01T00:00:00.000Z'),
  );

  // Create multiple metrics
  const promises = data.map(async (d) => metrics_repository.save(d));
  await Promise.all(promises);

  // Get metrics of athlete 2
  const metricsResult = await metrics_repository.getAthleteMetrics(athlete2.id, {
    limit: 10000,
    page: 1,
    metricType: MetricType.STRENGTH,
    start: parseISOString('2023-01-01T00:00:00.000Z'),
    end: parseISOString('2026-01-01T00:00:00.000Z'),
  });

  expect(metricsResult.length).toBe(metricsAthlete2.length);
});
