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
      'src/tests/mockPortalService.ts',
    ],
    exclude: ['dist', 'node_modules', 'src/tests', 'src/intro.stories.mdx'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/api/**',
        'src/tests',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/index.ts',
        'src/components/DataDisplay/Tutorial/HighlightBlocks/*',
        'src/components/Inputs/FieldSelector.tsx',
        'src/components/Feature/*',
        'src/utils/auth_environment.ts',
        'src/utils/export.ts',
        'src/providers/AuthProvider/**',
        'src/hooks/useSignalRMessages.ts',
        'src/hooks/useFeatureToggling.ts',
        'src/hooks/useOnScreen.ts',
      ],
      reporter: ['text-summary', 'html'],
      perFile: true,
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
});
