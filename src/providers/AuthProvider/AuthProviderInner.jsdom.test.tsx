import { ReactNode, useState } from 'react';

import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionType,
} from '@azure/msal-browser';

import { AuthState, MOCK_USER } from './AuthProvider';
import { AuthProviderInner } from './AuthProviderInner';
import { render, screen, waitFor } from 'src/tests/jsdomtest-utils';

const mocks = vi.hoisted(() => ({
  isInIframe: vi.fn<() => boolean>(() => false),
  login: vi.fn(() => Promise.resolve()),
  acquireToken: vi.fn<(...args: unknown[]) => Promise<unknown>>(() =>
    Promise.resolve(null)
  ),
  error: undefined as unknown,
  result: undefined as unknown,
  accounts: [] as unknown[],
  instance: {
    initialize: vi.fn(() => Promise.resolve()),
    setActiveAccount: vi.fn(),
  },
}));

// The jsdom setup (msalMock) replaces @azure/msal-browser with an empty stub
// that lacks the enums/classes AuthProviderInner imports. Use the real module.
vi.mock('@azure/msal-browser', async (importOriginal) =>
  importOriginal<typeof import('@azure/msal-browser')>()
);

vi.mock('@azure/msal-react', () => ({
  MsalProvider: ({ children }: { children: ReactNode }) => children,
  useMsal: () => ({
    instance: mocks.instance,
    accounts: mocks.accounts,
    inProgress: 'none',
  }),
  useMsalAuthentication: () => ({
    login: mocks.login,
    result: mocks.result,
    error: mocks.error,
    acquireToken: mocks.acquireToken,
  }),
}));

vi.mock('src/atoms/utils/auth_environment', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('src/atoms/utils/auth_environment')>();
  return {
    ...actual,
    auth: { ...actual.auth, isInIframe: () => mocks.isInIframe() },
  };
});

function Harness({
  initialState = 'loading',
  initialAccount,
}: {
  initialState?: AuthState;
  initialAccount?: typeof MOCK_USER;
}) {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [account, setAccount] = useState<AccountInfo | undefined>(
    initialAccount
  );
  const [, setRoles] = useState<string[] | undefined>();
  const [, setPhoto] = useState<string | undefined>();

  return (
    <AuthProviderInner
      account={account}
      setAccount={setAccount}
      setRoles={setRoles}
      setPhoto={setPhoto}
      authState={authState}
      setAuthState={setAuthState}
      withoutLoader={false}
      withoutBackend={false}
    >
      <p>app content</p>
    </AuthProviderInner>
  );
}

beforeEach(() => {
  mocks.isInIframe.mockReturnValue(false);
  mocks.error = undefined;
  mocks.result = undefined;
  mocks.accounts = [];
  mocks.login.mockClear();
  mocks.acquireToken.mockReset().mockResolvedValue(null);
  mocks.instance.initialize.mockClear();
  mocks.instance.setActiveAccount.mockClear();
});

test('iframe + initial silent InteractionRequiredAuthError renders children (interactionRequired)', async () => {
  mocks.isInIframe.mockReturnValue(true);
  mocks.error = new InteractionRequiredAuthError();

  render(<Harness />);

  expect(await screen.findByText('app content')).toBeInTheDocument();
  expect(mocks.login).not.toHaveBeenCalled();
});

test('iframe + roles-step InteractionRequiredAuthError renders children (interactionRequired)', async () => {
  mocks.isInIframe.mockReturnValue(true);
  mocks.acquireToken.mockRejectedValue(new InteractionRequiredAuthError());

  render(<Harness initialAccount={MOCK_USER} />);

  expect(await screen.findByText('app content')).toBeInTheDocument();
  expect(mocks.login).not.toHaveBeenCalled();
});

test('non-iframe + InteractionRequiredAuthError triggers redirect login', async () => {
  mocks.isInIframe.mockReturnValue(false);
  mocks.error = new InteractionRequiredAuthError();

  render(<Harness />);

  await waitFor(() =>
    expect(mocks.login).toHaveBeenCalledWith(
      InteractionType.Redirect,
      expect.anything()
    )
  );
});

test('non-iframe + non-interaction roles error renders MissingAccessToApp (unauthorized)', async () => {
  mocks.isInIframe.mockReturnValue(false);
  mocks.acquireToken.mockRejectedValue(new Error('boom'));

  render(<Harness initialAccount={MOCK_USER} />);

  expect(await screen.findByText(/don't have access/i)).toBeInTheDocument();
  expect(screen.queryByText('app content')).not.toBeInTheDocument();
});
