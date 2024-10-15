import { test, expect } from 'vitest';
import { PrismaClient } from '../build/generated/client';
import { faker } from '@faker-js/faker';
import { PrismaAthleteRepository } from '../src/athlete_repository';
import { Athlete } from '@virtuve/biz-core';
import { createAthlete } from './factory';

const prisma = new PrismaClient();
const repository = new PrismaAthleteRepository(prisma);

test('Save an athlete', async () => {
  const data = createAthlete();
  const athlete = await repository.save(data);

  expect(athlete).toStrictEqual(data);
});

test('Update an athlete', async () => {
  const data = createAthlete();

  // Save a user
  await repository.save(data);

  // Update data
  const updatedData = {
    ...data,
    name: faker.person.firstName(),
  };
  const updatedAthlete = await repository.save(updatedData);

  expect(updatedAthlete).toStrictEqual(updatedData);
});

test('Delete an athlete', async () => {
  const data = createAthlete();

  // Save a user
  await repository.save(data);

  // Delete a user
  await repository.delete(data.id);
});

test('Get an athlete', async () => {
  const data: Athlete = {
    id: faker.string.uuid(),
    age: faker.number.int({ min: 18, max: 80 }),
    name: faker.person.firstName(),
    team: faker.food.meat(),
  };

  // Save a user
  await repository.save(data);

  // Get a user
  const athlete = await repository.get(data.id);

  expect(athlete).toStrictEqual(data);
});

test('Get multiple athletes', async () => {
  const data = faker.helpers.multiple(createAthlete, {
    count: 10,
  });

  // Save users
  const promises = data.map(async (athlete) => {
    return repository.save(athlete);
  });

  const athletes = await Promise.all(promises);

  expect(athletes.length).toBe(10);
});
