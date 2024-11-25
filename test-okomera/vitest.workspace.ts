import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'apps/*',
  {
    extends: './vitest.config.ts',
  },
]);
