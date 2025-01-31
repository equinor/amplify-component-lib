import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsconfigPaths() as any],
  optimizeDeps: {
    include: ['react/jsx-dev-runtime'],
  },
  test: {
    globals: true,
    passWithNoTests: true,
    includeTaskLocation: true,
    testTimeout: 15000,
    fileParallelism: false,
    pool: 'threads',
    env: {
      VITE_IS_MOCK: 'true',
      VITE_NAME: 'Amplify components',
      VITE_ENVIRONMENT_NAME: 'local',
      VITE_API_CLIENT_ID: 'fake-id'
    },
    exclude: [
      'dist',
      'node_modules',
      'src/tests',
      'src/intro.stories.mdx',
      'src/**/*.docs.mdx',
      'src/storybook',
      '.idea'
    ],
    coverage: {
      enabled: false,
      cleanOnRerun: false,
      provider: 'v8',
      include: [
        'src/atoms/**/*',
        'src/molecules/**/*',
        'src/organisms/**/*',
        'src/providers/**/*',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.types.ts',
        'src/**/*.jsdom.test.tsx',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/**/*.docs.mdx',
        'src/**/stories/**',
        'src/**/index.ts',
        'src/atoms/utils/auth_environment.ts',
        'src/atoms/utils/export.ts',
        'src/atoms/utils/UtilStory.tsx',
        'src/providers/AuthProvider/**',
        'src/hooks/useSignalRMessages.ts',
        'src/hooks/useOnScreenMultiple.ts',
      ],
      reporter: [
        'text-summary',
        'html',
        ['json-summary', { file: 'coverage.json' }],
      ],
      reportOnFailure: true,
      thresholds: {
        perFile: true,
        100: true,
      },
    },
  },
});