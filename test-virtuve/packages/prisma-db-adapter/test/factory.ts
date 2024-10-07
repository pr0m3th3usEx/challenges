import { faker } from '@faker-js/faker';
import { Athlete, Metric, MetricType } from '@virtuve/biz-core';

export const createAthlete = (): Athlete => ({
  id: faker.string.uuid(),
  age: faker.number.int({ min: 18, max: 80 }),
  name: faker.person.firstName(),
  team: faker.food.meat(),
});

export const createMetricData = (
  metricType: MetricType,
  unit: string,
  min: number,
  max: number,
  timestamp?: Date,
): Omit<Metric, 'athleteId'> => ({
  id: faker.string.uuid(),
  metricType,
  unit,
  value: faker.number.int({ min, max }),
  timestamp: timestamp ?? faker.date.recent({ days: 10 }),
});

export const parseISOString = (s: string): Date => {
  const b = s.split(/\D+/).map(parseInt);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};
