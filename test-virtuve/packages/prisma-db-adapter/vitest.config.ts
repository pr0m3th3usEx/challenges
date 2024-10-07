import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [...configDefaults.include, '**/*.{unit,integration}.?(m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude, '**/build/**'],
    globals: true,
    environment: 'node',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
