import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
      },
      exclude: ['src/atoms', 'src/deprecated', 'src/**/*.styles.test.tsx'],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
      css: true
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      maxConcurrency: 35,
      server: {
        deps: {
          inline: ['@equinor/subsurface-app-management']
        }
      },
      include:[
        'src/atoms/**/*.test.ts',
        'src/atoms/**/*.test.tsx',
        '**/*.styles.test.tsx'
      ],
      exclude: ['src/deprecated'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/tests/setupNodeTests.ts', 'src/tests/browserMocks.ts', 'src/tests/msalMock.tsx'],
      testTimeout: 60000,
    }
  }
])
