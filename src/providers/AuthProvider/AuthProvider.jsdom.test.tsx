import { ReactNode } from 'react';

import { AuthProvider, useAuth } from './AuthProvider';
import { auth } from 'src/atoms/utils/auth_environment';
import { render, screen, userEvent, waitFor } from 'src/tests/jsdomtest-utils';

// The jsdom setup (msalMock) replaces @azure/msal-browser with an empty stub
// that lacks the enums AuthProviderInner imports (InteractionType, etc.). Use
// the real module here; we override the msalApp instance methods below.
vi.mock('@azure/msal-browser', async (importOriginal) =>
  importOriginal<typeof import('@azure/msal-browser')>()
);

// Fully mock msal-react so AuthProviderInner can render without a real MSAL
// instance (the jsdom setup only mocks MsalProvider).
vi.mock('@azure/msal-react', () => ({
  MsalProvider: ({ children }: { children: ReactNode }) => children,
  useMsal: () => ({
    instance: {
      initialize: vi.fn(() => Promise.resolve()),
      setActiveAccount: vi.fn(),
    },
    accounts: [],
    inProgress: 'none',
  }),
  useMsalAuthentication: () => ({
    login: vi.fn(() => Promise.resolve()),
    result: undefined,
    error: undefined,
    acquireToken: vi.fn(() => Promise.resolve(null)),
  }),
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({ roles: ['admin'] }),
}));

function Consumer() {
  const { authState, login } = useAuth();
  return (
    <div>
      <span>state: {authState}</span>
      <button onClick={() => login().catch(() => undefined)}>sign in</button>
    </div>
  );
}

beforeEach(() => {
  // Disable mock-auth mode so the real interactive login() path runs.
  vi.stubEnv('VITE_IS_MOCK', 'false');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

test('login() transitions interactionRequired to authorized in place using mock MSAL', async () => {
  // The jsdom setup mocks @azure/msal-browser's PublicClientApplication as an
  // empty class, so we assign the interactive methods we need directly onto
  // the (real) msalApp instance that AuthProvider uses.
  const msalApp = auth.msalApp as unknown as {
    loginPopup: ReturnType<typeof vi.fn>;
    acquireTokenSilent: ReturnType<typeof vi.fn>;
    setActiveAccount: ReturnType<typeof vi.fn>;
  };
  const loginPopup = vi.fn().mockResolvedValue({
    account: { homeAccountId: 'abc', username: 'user@equinor.com' },
  });
  msalApp.loginPopup = loginPopup;
  msalApp.acquireTokenSilent = vi
    .fn()
    .mockResolvedValue({ accessToken: 'token' });
  msalApp.setActiveAccount = vi.fn();

  const user = userEvent.setup();

  render(
    <AuthProvider withoutLoader>
      <Consumer />
    </AuthProvider>
  );

  expect(screen.getByText('state: loading')).toBeInTheDocument();

  await user.click(screen.getByText('sign in'));

  await waitFor(() => expect(loginPopup).toHaveBeenCalled());
  await waitFor(() =>
    expect(screen.getByText('state: authorized')).toBeInTheDocument()
  );
});
