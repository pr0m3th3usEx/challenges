import { expect, test } from 'vitest';
import add from '../src';

test('test add', () => {
  expect(add(3, 2)).toBe(5);
});
