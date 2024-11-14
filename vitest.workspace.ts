import { defineWorkspace } from 'vitest/config'
import { environment } from 'src';

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
      exclude: ['src/atoms', 'src/deprecated'],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
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
      exclude: ['src/deprecated', 'src/molecules', 'src/organisms'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/tests/setupNodeTests.ts', 'src/tests/browserMocks.ts', 'src/tests/msalMock.tsx'],
      testTimeout: 60000,
    }
  }
])
