import { test, expect } from 'vitest';
import config from '.';

test('Default configuration values', () => {
  expect(config.gateway.port).toBe(3000);

  expect(config.redis.port).toBe(6379);
  expect(config.redis.host).toBe('localhost');

  expect(config.cors.allowed_headers).toStrictEqual(['*']);
  expect(config.cors.allowed_methods).toStrictEqual(['*']);
  expect(config.cors.allowed_origins).toStrictEqual(['*']);
});
