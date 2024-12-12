import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      name: 'browser',
      browser: {
        enabled: true,
        viewport: {
          width: 1280,
          height: 900
        },
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
        screenshotFailures: false
      },
      exclude: [
        'src/utils',
        'src/**/*.jsdom.test.tsx',
        'src/**/*.utils.test.ts',
        'src/**/*.utils.test.tsx',
      ],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
      retry: 1,
      css: true
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      name: 'jsdom',
      environment: 'jsdom',
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
      include: [
        'src/utils/**/*.test.ts',
        'src/utils/**/*.test.tsx',
        'src/**/*.jsdom.test.tsx',
      ],
      setupFiles: [
        'src/test-utils/setupNodeTests.ts',
        'src/test-utils/browserMocks.ts',
      ],
    }
  }
])
