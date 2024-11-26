import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
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
      exclude: ['src/atoms', 'src/deprecated', 'src/**/*.jsdom.test.tsx'],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
      css: true
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      server: {
        deps: {
          inline: ['@equinor/subsurface-app-management']
        }
      },
      include:[
        'src/atoms/!**!/!*.test.ts',
        'src/atoms/!**!/!*.test.tsx',
        '**!/!*.jsdom.test.tsx'
      ],
      exclude: ['src/deprecated'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/tests/setupNodeTests.ts', 'src/tests/browserMocks.ts', 'src/tests/msalMock.tsx'],
      testTimeout: 60000,
    }
  }
])
