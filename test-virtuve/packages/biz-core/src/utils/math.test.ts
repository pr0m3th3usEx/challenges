import { assert, test } from 'vitest';
import { mean, variance, standardDeviation } from './math';

test('Mean - Basic', () => {
  const array = [2, 4, 6, 8, 10, 12, 14];

  assert.equal(mean(array), 8);
});

test('Mean - Empty array', () => {
  const array = [];

  assert.equal(mean(array), 0);
});

test('Variance - Basic', () => {
  const array = [2, 4, 6, 8, 10, 12, 14];

  assert.equal(variance(array), 16);
});

test('Variance - Empty array', () => {
  const array = [];

  assert.equal(variance(array), 0);
});

test('Standard deviation - Basic', () => {
  const array = [2, 4, 6, 8, 10, 12, 14];

  assert.equal(standardDeviation(array), 4);
});

test('Standard deviation - Empty array', () => {
  const array = [];

  assert.equal(standardDeviation(array), 0);
});
