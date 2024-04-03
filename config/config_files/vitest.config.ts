import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsconfigPaths() as any],
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    testTimeout: 10000,
    setupFiles: [
      'src/test-utils/setupTests.ts',
      'src/test-utils/mockLocalStorage.ts',
    ],
    exclude: ['**/node_modules/**', '**/test-utils/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['src/components/*'],
      exclude: ['src/api'],
      reporter: ['text-summary', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
