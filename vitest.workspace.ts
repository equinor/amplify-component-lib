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
        instances: [{
          browser: "chromium"
        }],
        provider: 'playwright',
        screenshotFailures: false
      },
      exclude: ['src/atoms', 'src/deprecated', 'src/**/*.jsdom.test.tsx', 'src/**/*.utils.test.ts'],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
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
])
