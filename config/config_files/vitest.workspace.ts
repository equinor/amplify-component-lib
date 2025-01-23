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
          browser: 'chromium'
        }],
        provider: 'playwright',
        screenshotFailures: false
      },
      exclude: [
        'src/**/*.test.ts',
        'src/utils/**/*.test.tsx',
        'src/**/*/utils/*.test.tsx',
        'src/**/*.jsdom.test.tsx',
      ],
      setupFiles: ['src/tests/setupBrowserTests.ts'],
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
        'src/**/*.test.ts',
        'src/utils/**/*.test.tsx',
        'src/**/*/utils/*.test.tsx',
        'src/**/*.jsdom.test.tsx',
      ],
      setupFiles: [
        'src/test-utils/setupNodeTests.ts',
        'src/test-utils/browserMocks.ts',
      ],
    }
  }
])
