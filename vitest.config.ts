import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsconfigPaths() as any],
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: [
      'src/tests/setupTests.ts',
      'src/tests/mockLocalStorage.ts',
      'src/tests/mockResizeObserver.ts',
      'src/tests/mockInteractionObserver.ts',
      'src/tests/mockMatchMedia.ts',
    ],
    exclude: ['dist', 'node_modules', 'src/tests', 'src/intro.stories.mdx'],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/api/**',
        'src/tests',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/**/stories/**',
        'src/**/index.ts',
        'src/components/DataDisplay/Tutorial/HighlightBlocks/*',
        'src/components/Inputs/FieldSelector.tsx',
        'src/components/Inputs/AmplifyTextField.tsx',
        'src/components/Feature/*',
        'src/components/Feedback/Skeleton/**',
        'src/utils/auth_environment.ts',
        'src/utils/export.ts',
        'src/providers/AuthProvider/**',
        'src/hooks/useSignalRMessages.ts',
        'src/hooks/useOnScreen.ts',
        'src/components/Navigation/TopBar/Resources/FeedbackForm/**',
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
