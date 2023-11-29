import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '../tests/test-utils';
import { useFeatureToggling } from './useFeatureToggling';
import { CancelablePromise } from 'src/api';
import { AuthProvider } from 'src/providers';

vi.mock('@azure/msal-react', () => ({
  MsalProvider: (children: any) => <div>{children}</div>,
}));

vi.mock('@azure/msal-browser', () => {
  return {
    PublicClientApplication: class PublicClientApplication {
      constructor() {
        console.log('created');
      }
    },
    AccountInfo: { username: 'mock' } as any,
  };
});
const ENVIRONMENT = 'test';
const uniqueFeatureKey = faker.database.mongodbObjectId();
enum Scenarios {
  WITH_FEATURES_KEY = 'withFeatures',
  WIHTOUT_FEATURES_KEY = 'withoutFatures',
  WHITELISTED_USER = 'whitelistedUser',
  WRONG_WHITELISTED_USER = 'wrongWhitelistedUser',
}
const mockedAppFeatures = [
  {
    applicationName: Scenarios.WITH_FEATURES_KEY,
    features: [
      {
        featureKey: uniqueFeatureKey,
        activeEnvironments: [ENVIRONMENT],
        activeUsers: [],
        uuid: '',
        description: '',
      },
    ],
  },
  {
    applicationName: Scenarios.WHITELISTED_USER,
    features: [
      {
        featureKey: uniqueFeatureKey,
        activeEnvironments: [ENVIRONMENT],
        activeUsers: ['MockUser@euquinor.com'],
        uuid: '',
        description: '',
      },
    ],
  },
  {
    applicationName: Scenarios.WRONG_WHITELISTED_USER,
    features: [
      {
        featureKey: uniqueFeatureKey,
        activeEnvironments: [],
        activeUsers: ['otherMockedUser@euquinor.com'],
        uuid: '',
        description: '',
      },
    ],
  },
  { applicationName: Scenarios.WIHTOUT_FEATURES_KEY, features: [] },
];
vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static getFeatureToggleFromApplicationName(
      key: string
    ): CancelablePromise<any> {
      return new CancelablePromise((resolve, reject) => {
        setTimeout(() => {
          if (mockServiceHasError) {
            reject('error release notes');
          } else {
            resolve(mockedAppFeatures.find((f) => f.applicationName === key));
          }
        }, 300);
      });
    }
  }
  return { PortalService };
});

const mockServiceHasError = false;

function Wrappers({ children }: { children: any }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

test('should return true for showContent when there is a feature and it is matching the environment we are in', async () => {
  vi.stubEnv('VITE_NAME', Scenarios.WITH_FEATURES_KEY);
  vi.stubEnv('VITE_ENVIRONMENT_NAME', ENVIRONMENT);
  const { result } = renderHook(() => useFeatureToggling(uniqueFeatureKey), {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      expect(result.current.showContent).toBe(true);
    },
    { timeout: 600 }
  );
});
test('should return false for showContent when there is a feature but it does not match the environment we are in', async () => {
  vi.stubEnv('VITE_NAME', Scenarios.WITH_FEATURES_KEY);
  vi.stubEnv('VITE_ENVIRONMENT_NAME', faker.animal.dog());
  const { result } = renderHook(() => useFeatureToggling(uniqueFeatureKey), {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      expect(result.current.showContent).toBe(false);
    },
    { timeout: 600 }
  );
});
test('should return false for showContent when there is not a feature, despite matching the environment we are in', async () => {
  vi.stubEnv('VITE_NAME', Scenarios.WITH_FEATURES_KEY);
  vi.stubEnv('VITE_ENVIRONMENT_NAME', ENVIRONMENT);
  const { result } = renderHook(() => useFeatureToggling(faker.animal.bird()), {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      expect(result.current.showContent).toBe(false);
    },
    { timeout: 600 }
  );
});
test('should return true for showContent when there is a feature and we have a whitelisted user, but not matching the environment we are in', async () => {
  vi.stubEnv('VITE_NAME', Scenarios.WHITELISTED_USER);
  vi.stubEnv('VITE_ENVIRONMENT_NAME', faker.animal.dog());
  const { result } = renderHook(() => useFeatureToggling(uniqueFeatureKey), {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      expect(result.current.showContent).toBe(true);
    },
    { timeout: 600 }
  );
});
test('should return false for showContent when there is a feature, but not matching the environment or the whitelisted user', async () => {
  vi.stubEnv('VITE_NAME', Scenarios.WRONG_WHITELISTED_USER);
  vi.stubEnv('VITE_ENVIRONMENT_NAME', faker.animal.dog());
  const { result } = renderHook(() => useFeatureToggling(uniqueFeatureKey), {
    wrapper: Wrappers,
  });

  await waitFor(
    () => {
      expect(result.current.showContent).toBe(true);
    },
    { timeout: 600 }
  );
});
