import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

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
    projects: [
      {
        extends: 'vitest.config.ts',
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'bun run storybook --ci',
          }),
        ],
        test: {
          name: 'storybook',
          server: {
            deps: {
              inline: [
                '@equinor/eds-tokens',
                '@equinor/eds-core-react',
                '@equinor/amplify-component-lib',
                '@equinor/subsurface-app-management',
              ],
            },
          },
          testTimeout: 30000,
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: 'chromium',
              },
            ],
            provider: 'playwright',
          },
          include: ['**/*.stories.tsx'],
          exclude: ['**/node_modules/**', '**/test-utils/**', '**/e2e/**'],
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
      {
        extends: 'vitest.config.ts',
        test: {
          name: 'browser',
          browser: {
            enabled: true,
            provider: "playwright",
            viewport: {
              width: 1280,
              height: 900
            },
            instances: [
              { browser: "chromium", }
            ],
            screenshotFailures: false
          },
          exclude: ['src/atoms', 'src/deprecated', 'src/**/*.jsdom.test.tsx', 'src/**/*.utils.test.ts'],
          setupFiles: ['src/tests/setupBrowserTests.ts', 'src/tests/framerMotionMock.ts'],
          retry: 1,
          css: true
        },
      },
      {
        extends: 'vitest.config.ts',
        test: {
          name: 'jsdom',
          server: {
            deps: {
              inline: ['@equinor/subsurface-app-management']
            }
          },
          include:[
            'src/atoms/**/*.test.ts',
            'src/atoms/**/*.test.tsx',
            'src/**/*.jsdom.test.tsx',
            'src/**/*.utils.test.ts'
          ],
          exclude: ['src/deprecated'],
          environment: 'jsdom',
          setupFiles: ['src/tests/setupNodeTests.ts', 'src/tests/browserMocks.ts', 'src/tests/msalMock.tsx'],
        }
      }
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