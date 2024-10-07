import { faker } from '@faker-js/faker';
import { Athlete } from '@virtuve/biz-core';

export const createAthlete = (): Athlete => ({
  id: faker.string.uuid(),
  age: faker.number.int({ min: 18, max: 80 }),
  name: faker.person.firstName(),
  team: faker.food.meat(),
});
