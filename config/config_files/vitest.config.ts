import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        passWithNoTests: true,
        testTimeout: 10000,
        env: {
          VITE_IS_MOCK: 'true',
        },
        exclude: ['**/node_modules/**', '**/test-utils/**', '**/e2e/**'],
        coverage: {
          enabled: false,
          provider: 'v8',
          cleanOnRerun: false,
          reportOnFailure: true,
          include: ['src/**/*'],
          exclude: [
            'src/api',
            'src/e2e',
            'src/test-utils',
            'src/**/index.ts',
            'src/**/*.test.ts',
            'src/**/*.test.tsx',
          ],
          reporter: [
            'text-summary',
            'html',
            ['json-summary', { file: 'coverage.json' }],
          ],
          thresholds: {
            perFile: true,
            autoUpdate: true,
            100: true,
          },
        },
      },
    })
  )
);
