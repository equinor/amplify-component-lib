import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsconfigPaths() as any],
  test: {
    globals: true,
    passWithNoTests: true,
    includeTaskLocation: true,
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
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.d.ts',
        'src/tests',
        'src/types',
        'src/**/*.test.ts',
        'src/**/*.types.ts',
        'src/**/*.styles.test.tsx',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/**/*.docs.mdx',
        'src/**/stories/**',
        'src/**/index.ts',
        'src/deprecated/**/*',
        'src/atoms/utils/auth_environment.ts',
        'src/atoms/utils/export.ts',
        'src/atoms/utils/UtilStory.tsx',
        'src/providers/AuthProvider/**',
        'src/hooks/useSignalRMessages.ts',
        'src/hooks/useOnScreenMultiple.ts',
        'src/components/Navigation/TopBar/Resources/FeedbackForm/**',
        'src/storybook',
      ],
      reporter: [
        'text-summary',
        'html',
        ['json-summary', { file: 'coverage.json' }],
      ],
      reportOnFailure: true,
      thresholds: {
        perFile: true,
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
