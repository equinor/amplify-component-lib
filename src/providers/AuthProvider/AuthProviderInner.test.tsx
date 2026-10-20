import { StrictMode, useState } from 'react';

import {
  AccountInfo,
  AuthenticationResult,
  BrowserAuthError,
  BrowserAuthErrorCodes,
  EventHandler,
  EventMessage,
  EventType,
  InteractionRequiredAuthError,
  InteractionType,
  SilentRequest,
  SsoSilentRequest,
} from '@azure/msal-browser';
import { MsalProvider, useMsalAuthentication } from '@azure/msal-react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { auth, getPendingSso } from 'src/atoms/utils/auth_environment';
import { AuthState } from 'src/providers/AuthProvider/AuthProvider';
import { AuthProviderInner } from 'src/providers/AuthProvider/AuthProviderInner';

// Exercise the real MsalProvider/useMsal/event reducer (and consumer login hook)
// in the existing Vitest browser project. Overlapping SSO reports 'none' too
// early, and loginPopup with a cached account reports ACQUIRE_TOKEN_SUCCESS.
const isBackendRequest = (request: SilentRequest) =>
  !request.scopes.includes('User.Read');

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const first: AccountInfo = {
  homeAccountId: 'first',
  localAccountId: 'first-local',
  tenantId: 'tenant',
  environment: 'login.microsoftonline.com',
  username: 'first@example.com',
};
const second: AccountInfo = {
  ...first,
  homeAccountId: 'second',
  localAccountId: 'second-local',
};
const jwt = (payload: object) =>
  `e30.${btoa(JSON.stringify(payload))}.signature`;
const result = (account = first, token = jwt({ roles: ['READ'] })) =>
  ({
    account,
    accessToken: token,
    idToken: '',
    correlationId: '',
  }) as AuthenticationResult;

let cached: AccountInfo[];
let active: AccountInfo | null;
let silent: ReturnType<typeof deferred<AuthenticationResult>>[];

function emit(
  eventType: EventType,
  payload: EventMessage['payload'] = null,
  error: Error | null = null,
  interactionType = InteractionType.Silent
) {
  events.emitEvent(eventType, interactionType, payload, error);
}

const instance = auth.msalApp;
const acquireTokenSilent = instance.acquireTokenSilent.bind(instance);
const controller = (
  instance as unknown as {
    controller: {
      eventHandler: EventHandler;
      acquireTokenSilentAsync: (
        request: SilentRequest,
        account: AccountInfo
      ) => Promise<AuthenticationResult>;
    };
  }
).controller;
// Use the SDK emitter so singleton callbacks installed before mounting/spying
// stay registered and receive exactly the same events as the React listeners.
const events = controller.eventHandler;
const callbacks = (
  events as unknown as { eventCallbacks: Map<string, unknown> }
).eventCallbacks;
const singletonCallbackCount = callbacks.size;
const tokenRequests = () =>
  vi.mocked(instance.acquireTokenSilent).mock.calls.map(([request]) => request);
const backendRequests = () => tokenRequests().filter(isBackendRequest);
const startupRequests = () =>
  tokenRequests().filter((request) => request.scopes.includes('openid'));
const photoRequests = () =>
  tokenRequests().filter(
    (request) =>
      !isBackendRequest(request) && !request.scopes.includes('openid')
  );
const iframe = () =>
  vi
    .spyOn(window, 'self', 'get')
    .mockReturnValue({} as Window & typeof globalThis);

function cacheAccount(account = first, accounts = [account]) {
  cached = accounts;
  active = account;
}

// Initialize the real SDK so deduplication regressions can leave its public
// acquireTokenSilent wrapper intact and mock only the underlying acquisition.
beforeAll(async () => {
  await instance.initialize();
});

beforeEach(() => {
  // Vitest itself renders tests in an iframe. Default to standalone, then opt
  // into the embedded scenario explicitly in individual tests.
  vi.spyOn(window, 'self', 'get').mockReturnValue(
    window.top as Window & typeof globalThis
  );

  cached = [];
  active = null;
  silent = [];
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(console, 'log').mockImplementation(() => undefined);
  vi.spyOn(instance, 'initialize').mockResolvedValue();
  vi.spyOn(instance, 'handleRedirectPromise').mockResolvedValue(null);
  vi.spyOn(instance, 'getAllAccounts').mockImplementation(() => cached);
  vi.spyOn(instance, 'getActiveAccount').mockImplementation(() => active);
  vi.spyOn(instance, 'setActiveAccount').mockImplementation((account) => {
    // MSAL 3.28 emits ACTIVE_ACCOUNT_CHANGED only for storage events from
    // another window, not this setter. Popup success itself selects the account.
    active = account;
  });
  vi.spyOn(instance, 'loginRedirect').mockImplementation(
    () => new Promise(() => undefined)
  );
  vi.spyOn(instance, 'loginPopup').mockImplementation(async () => {
    const existing = cached.length > 0;
    emit(
      existing ? EventType.ACQUIRE_TOKEN_START : EventType.LOGIN_START,
      null,
      null,
      InteractionType.Popup
    );
    const response = result(active ?? first);
    if (!existing) cached = [response.account];
    emit(
      existing ? EventType.ACQUIRE_TOKEN_SUCCESS : EventType.LOGIN_SUCCESS,
      response,
      null,
      InteractionType.Popup
    );
    return response;
  });
  vi.spyOn(instance, 'ssoSilent').mockImplementation(
    (request: SsoSilentRequest) => {
      emit(EventType.SSO_SILENT_START, request);
      const attempt = deferred<AuthenticationResult>();
      silent.push(attempt);
      return attempt.promise
        .then((response) => {
          if (
            !cached.some(
              (account) =>
                account.homeAccountId === response.account.homeAccountId
            )
          ) {
            cached = [...cached, response.account];
          }
          emit(EventType.SSO_SILENT_SUCCESS, response);
          return response;
        })
        .catch((error: Error) => {
          // Exact MSAL 3.28 contract: failure has NO correlationId/payload.
          emit(EventType.SSO_SILENT_FAILURE, null, error);
          throw error;
        });
    }
  );
  vi.spyOn(instance, 'acquireTokenSilent').mockImplementation(
    async (request: SilentRequest) =>
      result(
        request.account ?? active ?? first,
        isBackendRequest(request) ? jwt({ roles: ['READ'] }) : 'photo'
      )
  );
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(null, { status: 404 })
  );
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: vi.fn(() => 'blob:photo'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(async () => {
  cleanup();
  // Finish outstanding requests through their normal SDK terminal events;
  // never reset the singleton count or replace its callback registry.
  await act(async () => {
    silent.forEach((attempt) => attempt.reject(fail));
  });
  expect(callbacks.size).toBe(singletonCallbackCount);
  expect(getPendingSso()).toBe(0);
  vi.restoreAllMocks();
});

function PopupConsumer() {
  // Keep the real consumer hook: cached-account popup success is reported as
  // ACQUIRE_TOKEN_SUCCESS, not necessarily LOGIN_SUCCESS.
  const { login } = useMsalAuthentication(
    InteractionType.Silent,
    auth.GRAPH_REQUESTS_LOGIN
  );
  return (
    <button
      onClick={() => {
        void login(InteractionType.Popup).then((response) => {
          if (response) instance.setActiveAccount(response.account);
        });
      }}
    >
      Sign in
    </button>
  );
}

function Mount({
  withoutBackend = false,
  popup = false,
  withoutLoader = true,
}: {
  withoutBackend?: boolean;
  popup?: boolean;
  withoutLoader?: boolean;
}) {
  // Use the same real React state/setters as AuthProvider, without its mockAuth
  // path (enabled globally by the test config). MSAL and its hooks are real.
  const [account, setAccount] = useState<AccountInfo>();
  const [roles, setRoles] = useState<string[]>();
  const [photo, setPhoto] = useState<string>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  return (
    <>
      <output data-testid="context">
        {JSON.stringify({
          authState,
          account: account?.homeAccountId,
          roles,
          photo,
        })}
      </output>
      <MsalProvider instance={instance}>
        <AuthProviderInner
          account={account}
          setAccount={setAccount}
          setRoles={setRoles}
          setPhoto={setPhoto}
          authState={authState}
          setAuthState={setAuthState}
          withoutLoader={withoutLoader}
          withoutBackend={withoutBackend}
          loadingComponent={<p>Custom loading</p>}
          unauthorizedComponent={
            <>{popup ? <PopupConsumer /> : <p>Custom unauthorized</p>}</>
          }
        >
          {popup ? <PopupConsumer /> : <p>Content</p>}
        </AuthProviderInner>
      </MsalProvider>
    </>
  );
}
const context = () =>
  JSON.parse(screen.getByTestId('context').textContent ?? '{}');
const state = async (authState: AuthState) =>
  waitFor(() => expect(context().authState).toBe(authState));
const boot = async () => waitFor(() => expect(silent.length).toBe(1));
const fail = new InteractionRequiredAuthError('interaction_required');
const timeout = new BrowserAuthError(
  BrowserAuthErrorCodes.monitorWindowTimeout
);
const interactionErrors = [fail, timeout];
const popupEvents = [
  {
    start: EventType.LOGIN_START,
    failure: EventType.LOGIN_FAILURE,
    success: EventType.LOGIN_SUCCESS,
  },
  {
    start: EventType.ACQUIRE_TOKEN_START,
    failure: EventType.ACQUIRE_TOKEN_FAILURE,
    success: EventType.ACQUIRE_TOKEN_SUCCESS,
  },
];

function startSso(sid = 'parent-sid') {
  // Model independent parent SSO with real events, not a changed allowlist.
  let promise!: Promise<AuthenticationResult | undefined>;
  act(() => {
    promise = instance.ssoSilent({ sid }).catch(() => undefined);
  });
  return promise;
}

async function parentAttempt() {
  startSso();
  await waitFor(() => expect(silent.length).toBe(2));
}

test.each(['success', 'failure'] as const)(
  'parent SSO started before mount cannot finish pending startup; startup %s settles',
  async (outcome) => {
    iframe();
    const earlyParent = instance
      .ssoSilent({ sid: 'early-parent-sid' })
      .catch(() => undefined);
    render(<Mount />);
    await waitFor(() => expect(silent.length).toBe(2));
    await act(async () => {
      silent[0].reject(fail);
      await earlyParent;
    });
    expect(context().authState).toBe('loading');
    await act(async () => {
      if (outcome === 'success') silent[1].resolve(result());
      else silent[1].reject(fail);
    });
    await state(outcome === 'success' ? 'authorized' : 'unauthorized');
    expect(instance.loginRedirect).not.toHaveBeenCalled();
    expect(instance.loginPopup).not.toHaveBeenCalled();
  }
);

test('remount retains pending SSO from the previous provider until both attempts settle', async () => {
  iframe();
  const mounted = render(<Mount />);
  await boot();
  mounted.unmount();
  expect(callbacks.size).toBe(singletonCallbackCount);
  render(<Mount />);
  await waitFor(() => expect(silent.length).toBe(2));
  await act(async () => silent[0].reject(fail));
  expect(context().authState).toBe('loading');
  await act(async () => silent[1].resolve(result()));
  await state('authorized');
  expect(context()).toMatchObject({ account: 'first', roles: ['READ'] });
  expect(instance.loginRedirect).not.toHaveBeenCalled();
});

test.each([0, 1])(
  'parent/startup overlap: failure of attempt %s cannot finish loading; complete failure settles',
  async (firstFailure) => {
    iframe();
    render(<Mount />);
    await boot();
    await parentAttempt();
    await act(async () => silent[firstFailure].reject(fail));
    expect(context().authState).toBe('loading');
    await act(async () => silent[1 - firstFailure].reject(fail));
    await state('unauthorized');
  }
);

test('parent SSO success after startup failure verifies backend roles and survives later silent failures', async () => {
  iframe();
  render(<Mount />);
  await boot();
  await parentAttempt();
  await act(async () => silent[0].reject(fail));
  await act(async () => silent[1].resolve(result()));
  await state('authorized');
  expect(context()).toMatchObject({ account: 'first', roles: ['READ'] });
  const extra = startSso('extra');
  expect(context()).toMatchObject({ authState: 'authorized', roles: ['READ'] });
  await act(async () => {
    silent[2].reject(fail);
    await extra;
  });
  await state('authorized');
  expect(backendRequests()).toHaveLength(1);
  expect(photoRequests()).toHaveLength(1);
});

test.each(
  [
    { embedded: true, hasCachedAccount: false },
    { embedded: false, hasCachedAccount: false },
    { embedded: false, hasCachedAccount: true },
  ].flatMap((scenario) =>
    interactionErrors.map((error) => ({ ...scenario, error }))
  )
)(
  'silent failure (iframe=$embedded, cached=$hasCachedAccount, $error) uses the expected recovery',
  async ({ embedded, hasCachedAccount, error }) => {
    if (embedded) iframe();
    if (hasCachedAccount) {
      cacheAccount();
      vi.mocked(instance.acquireTokenSilent).mockImplementation(
        async (request) => {
          if (isBackendRequest(request)) throw error;
          return result(first, 'photo');
        }
      );
    }
    render(<Mount />);
    if (!hasCachedAccount) {
      await boot();
      expect(context().authState).toBe('loading');
      await act(async () => silent[0].reject(error));
    }
    if (embedded) {
      await state('unauthorized');
      expect(instance.loginRedirect).not.toHaveBeenCalled();
      expect(instance.loginPopup).not.toHaveBeenCalled();
    } else {
      await waitFor(() =>
        expect(instance.loginRedirect).toHaveBeenCalledOnce()
      );
      expect(instance.loginRedirect).toHaveBeenCalledWith(
        auth.GRAPH_REQUESTS_LOGIN
      );
    }
  }
);

test('cached active account wins over accounts[0] and token requests bind that identity', async () => {
  cacheAccount(second, [first, second]);
  render(<Mount />);
  await state('authorized');
  expect(context()).toMatchObject({ account: 'second', roles: ['READ'] });
  expect(instance.ssoSilent).not.toHaveBeenCalled();
  expect(instance.acquireTokenSilent).toHaveBeenCalledWith({
    scopes: [expect.any(String)],
    account: second,
  });
});

test.each(['', jwt({}), 'invalid', jwt({ roles: [3] })])(
  'missing/invalid backend token or roles (%s) fails closed without retry loop',
  async (token) => {
    iframe();
    cacheAccount();
    vi.mocked(instance.acquireTokenSilent).mockResolvedValue(
      result(first, token)
    );
    render(<Mount />);
    await state('unauthorized');
    expect(context().roles).toBeUndefined();
    expect(startupRequests()).toHaveLength(1);
    expect(backendRequests()).toHaveLength(1);
    expect(photoRequests()).toHaveLength(1);
  }
);

test.each(['success', 'failure'] as const)(
  'cached backend failure waits for pending parent SSO, then handles parent %s',
  async (outcome) => {
    iframe();
    cacheAccount();
    const backend = deferred<AuthenticationResult>();
    let backendCalls = 0;
    vi.mocked(instance.acquireTokenSilent).mockImplementation(
      async (request) => {
        if (!isBackendRequest(request)) return result(first, 'photo');
        return ++backendCalls === 1
          ? backend.promise
          : result(first, jwt({ roles: ['RECOVERED_READ'] }));
      }
    );
    render(<Mount />);
    await waitFor(() => expect(backendCalls).toBe(1));
    const parent = startSso();
    await act(async () =>
      backend.reject(
        new BrowserAuthError(BrowserAuthErrorCodes.monitorWindowTimeout)
      )
    );
    expect(context()).toMatchObject({ account: 'first', authState: 'loading' });
    expect(context().roles).toBeUndefined();
    expect(backendCalls).toBe(1);
    expect(photoRequests()).toHaveLength(1);
    await act(async () => {
      if (outcome === 'success') silent[0].resolve(result(first));
      else silent[0].reject(fail);
      await parent;
    });
    await state(outcome === 'success' ? 'authorized' : 'unauthorized');
    expect(context().account).toBe('first');
    expect(context().roles).toEqual(
      outcome === 'success' ? ['RECOVERED_READ'] : undefined
    );
    expect(backendCalls).toBe(outcome === 'success' ? 2 : 1);
    expect(photoRequests()).toHaveLength(outcome === 'success' ? 2 : 1);
    expect(instance.loginRedirect).not.toHaveBeenCalled();
  }
);

test('cached backend failure waits for all overlapping parent SSO attempts, not just MSAL None', async () => {
  iframe();
  cacheAccount();
  const backend = deferred<AuthenticationResult>();
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) =>
    isBackendRequest(request) ? backend.promise : result(first, 'photo')
  );
  render(<Mount />);
  await waitFor(() => expect(backendRequests()).toHaveLength(1));
  const parents = Promise.all([startSso('parent-one'), startSso('parent-two')]);
  await act(async () => backend.reject(fail));
  expect(context().authState).toBe('loading');
  await act(async () => silent[0].reject(fail));
  expect(context().authState).toBe('loading');
  await act(async () => {
    silent[1].reject(fail);
    await parents;
  });
  await state('unauthorized');
  expect(backendRequests()).toHaveLength(1);
  expect(photoRequests()).toHaveLength(1);
});

test('standalone cached backend timeout redirects only after pending parent SSO settles', async () => {
  const error = timeout;
  cacheAccount();
  const backend = deferred<AuthenticationResult>();
  const redirect = deferred<void>();
  vi.mocked(instance.loginRedirect).mockImplementation(async () => {
    emit(EventType.LOGIN_START, null, null, InteractionType.Redirect);
    try {
      await redirect.promise;
    } catch (redirectError) {
      emit(
        EventType.LOGIN_FAILURE,
        null,
        redirectError as Error,
        InteractionType.Redirect
      );
      throw redirectError;
    }
  });
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) =>
    isBackendRequest(request) ? backend.promise : result(first, 'photo')
  );
  render(<Mount />);
  await waitFor(() => expect(backendRequests()).toHaveLength(1));
  const parent = startSso();
  await act(async () => backend.reject(error));
  expect(context().authState).toBe('loading');
  expect(instance.loginRedirect).not.toHaveBeenCalled();
  await act(async () => {
    silent[0].reject(new Error('Parent SSO failed'));
    await parent;
  });
  await waitFor(() => expect(instance.loginRedirect).toHaveBeenCalledOnce());
  expect(instance.loginRedirect).toHaveBeenCalledWith(
    auth.GRAPH_REQUESTS_LOGIN
  );
  expect(context().authState).toBe('loading');
  await act(async () => redirect.reject(error));
  await state('unauthorized');
  expect(instance.loginRedirect).toHaveBeenCalledOnce();
  expect(backendRequests()).toHaveLength(1);
  expect(photoRequests()).toHaveLength(1);
});

test('backend rejection is terminal; popup with the same cached account retries through real consumer hook and ACQUIRE_TOKEN_SUCCESS', async () => {
  iframe();
  cacheAccount();
  let backendCalls = 0;
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) => {
    if (isBackendRequest(request) && ++backendCalls === 1) throw fail;
    return result(request.account ?? first);
  });
  render(<Mount popup />);
  await state('unauthorized');
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  await state('authorized');
  expect(backendCalls).toBe(2);
  expect(context()).toMatchObject({ account: 'first', roles: ['READ'] });
  expect(instance.loginPopup).toHaveBeenCalledOnce();
  expect(instance.loginRedirect).not.toHaveBeenCalled();
});

test('default loader keeps the recovery hook mounted through its silent retry and popup recovery', async () => {
  iframe();
  render(<Mount popup withoutLoader={false} />);
  await boot();
  await act(async () => silent[0].reject(fail));
  await waitFor(() => expect(silent).toHaveLength(2));
  const button = screen.getByRole('button', { name: 'Sign in' });
  expect(context().authState).toBe('loading');
  await act(async () => silent[1].reject(fail));
  await state('unauthorized');
  expect(screen.getByRole('button', { name: 'Sign in' })).toBe(button);
  expect(silent).toHaveLength(2);
  fireEvent.click(button);
  await state('authorized');
  expect(context()).toMatchObject({ account: 'first', roles: ['READ'] });
  expect(instance.loginPopup).toHaveBeenCalledOnce();
  expect(instance.loginRedirect).not.toHaveBeenCalled();
  expect(silent).toHaveLength(2);
});

test('initialization failure settles rather than leaving loading forever', async () => {
  iframe();
  vi.mocked(instance.initialize).mockRejectedValue(
    new Error('initialization failed')
  );
  render(<Mount />);
  await state('unauthorized');
  expect(instance.ssoSilent).not.toHaveBeenCalled();
});

test('StrictMode starts once, completes authorization, and removes listeners on unmount', async () => {
  iframe();
  const mounted = render(
    <StrictMode>
      <Mount />
    </StrictMode>
  );
  await boot();
  await act(async () => silent[0].resolve(result()));
  await state('authorized');
  expect(instance.ssoSilent).toHaveBeenCalledOnce();
  expect(instance.acquireTokenSilent).toHaveBeenCalledTimes(2);
  mounted.unmount();
  expect(callbacks.size).toBe(singletonCallbackCount);
});

test('account switch clears previous roles/photo and ignores old backend and photo responses', async () => {
  iframe();
  cacheAccount(first, [first, second]);
  const oldBackend = deferred<AuthenticationResult>();
  const oldPhoto = deferred<Response>();
  const newBackend = deferred<AuthenticationResult>();
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) => {
    if (!isBackendRequest(request))
      return result(request.account ?? first, 'photo');
    return request.account?.homeAccountId === 'first'
      ? oldBackend.promise
      : newBackend.promise;
  });
  vi.mocked(fetch).mockReturnValue(oldPhoto.promise);
  render(<Mount />);
  await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
  act(() => {
    instance.setActiveAccount(second);
    emit(EventType.ACTIVE_ACCOUNT_CHANGED);
  });
  expect(context()).toMatchObject({ authState: 'loading', account: 'second' });
  expect(context().roles).toBeUndefined();
  await act(async () => {
    oldBackend.resolve(result(first, jwt({ roles: ['OLD_WRITE'] })));
    oldPhoto.resolve(new Response(new Blob(['old-photo'])));
  });
  expect(context().authState).toBe('loading');
  await act(async () =>
    newBackend.resolve(result(second, jwt({ roles: ['NEW_READ'] })))
  );
  await state('authorized');
  expect(context()).toMatchObject({ account: 'second', roles: ['NEW_READ'] });
  // Both fetches share the deferred response; only the current account may store a photo.
  expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
});

test('switching an authorized account clears its roles and photo before the new token is verified', async () => {
  iframe();
  cacheAccount(first, [first, second]);
  const newBackend = deferred<AuthenticationResult>();
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) => {
    if (!isBackendRequest(request))
      return result(request.account ?? first, 'photo');
    return request.account?.homeAccountId === 'first'
      ? result(first, jwt({ roles: ['OLD_WRITE'] }))
      : newBackend.promise;
  });
  vi.mocked(fetch).mockResolvedValue(new Response(new Blob(['photo'])));
  render(<Mount />);
  await state('authorized');
  await waitFor(() => expect(context().photo).toBe('blob:photo'));
  act(() => {
    cached = [first, second];
    emit(
      EventType.ACQUIRE_TOKEN_SUCCESS,
      result(second),
      null,
      InteractionType.Popup
    );
  });
  expect(context()).toMatchObject({ authState: 'loading', account: 'second' });
  expect(context().roles).toBeUndefined();
  expect(context().photo).toBeUndefined();
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:photo');
  await act(async () => newBackend.reject(fail));
  await state('unauthorized');
  expect(context().roles).toBeUndefined();
  expect(active).toEqual(second);
});

test.each(
  ['parent', 'popup'].flatMap((source) =>
    ['success', 'failure'].map((outcome) => ({ source, outcome }))
  )
)(
  '$source recovery discards pending backend $outcome before fresh verification with real SDK deduplication',
  async ({ source, outcome }) => {
    iframe();
    cacheAccount();
    const oldBackend = deferred<AuthenticationResult>();
    const freshBackend = deferred<AuthenticationResult>();
    let backendCalls = 0;
    vi.mocked(instance.acquireTokenSilent).mockImplementation(
      acquireTokenSilent
    );
    vi.spyOn(controller, 'acquireTokenSilentAsync').mockImplementation(
      async (request) => {
        if (!isBackendRequest(request)) return result(first, 'photo');
        return ++backendCalls === 1 ? oldBackend.promise : freshBackend.promise;
      }
    );
    try {
      render(<Mount />);
      await waitFor(() => expect(backendCalls).toBe(1));
      if (source === 'parent') {
        const parent = startSso();
        await act(async () => {
          silent[0].resolve(result(first));
          await parent;
        });
      } else {
        act(() =>
          emit(
            EventType.ACQUIRE_TOKEN_SUCCESS,
            result(first),
            null,
            InteractionType.Popup
          )
        );
      }
      expect(context().authState).toBe('loading');
      expect(backendCalls).toBe(1);
      await act(async () => {
        if (outcome === 'success')
          oldBackend.resolve(result(first, jwt({ roles: ['OLD_WRITE'] })));
        else oldBackend.reject(timeout);
      });
      expect(context().authState).toBe('loading');
      expect(context().roles).toBeUndefined();
      await waitFor(() => expect(backendCalls).toBe(2));
      expect(backendRequests()).toHaveLength(2);
      await act(async () =>
        freshBackend.resolve(result(first, jwt({ roles: ['NEW_READ'] })))
      );
      await state('authorized');
      expect(context()).toMatchObject({
        account: 'first',
        roles: ['NEW_READ'],
      });
      expect(instance.loginRedirect).not.toHaveBeenCalled();
    } finally {
      // A failing assertion must not leave an acquisition in MSAL's real map.
      await act(async () => {
        oldBackend.resolve(result());
        freshBackend.resolve(result());
      });
    }
  }
);

test('parent silent retry after complete failure can recover without remount', async () => {
  iframe();
  render(<Mount />);
  await boot();
  await act(async () => silent[0].reject(fail));
  await state('unauthorized');
  await parentAttempt();
  expect(context().authState).toBe('loading');
  await act(async () => silent[1].resolve(result()));
  await state('authorized');
});

test.each(
  ['startup', 'parent'].flatMap((source) =>
    popupEvents.map((events) => ({ source, ...events }))
  )
)(
  '$source SSO succeeds after popup cancellation ($start)',
  async ({ source, start, failure }) => {
    iframe();
    render(<Mount />);
    await boot();
    if (source === 'parent') {
      await act(async () => silent[0].reject(fail));
      await state('unauthorized');
      await parentAttempt();
    }
    act(() => emit(start, null, null, InteractionType.Popup));
    act(() =>
      emit(
        failure,
        null,
        new BrowserAuthError(BrowserAuthErrorCodes.userCancelled),
        InteractionType.Popup
      )
    );
    expect(active).toBeNull();
    expect(context().authState).toBe('loading');
    await act(async () =>
      silent[source === 'startup' ? 0 : 1].resolve(result(first))
    );
    await state('authorized');
    expect(active).toEqual(first);
    expect(context()).toMatchObject({ account: 'first', roles: ['READ'] });
    expect(instance.acquireTokenSilent).toHaveBeenCalledTimes(2);
    expect(instance.loginRedirect).not.toHaveBeenCalled();
  }
);

test('late bootstrap SSO success cannot replace an actual active-account change', async () => {
  iframe();
  render(<Mount />);
  await boot();
  act(() => {
    cached = [second];
    instance.setActiveAccount(second);
    emit(EventType.ACTIVE_ACCOUNT_CHANGED);
  });
  await state('authorized');
  await act(async () => silent[0].resolve(result(first)));
  expect(active).toEqual(second);
  expect(context()).toMatchObject({ account: 'second', roles: ['READ'] });
  expect(instance.acquireTokenSilent).toHaveBeenCalledTimes(2);
});

test.each(popupEvents)(
  'late bootstrap SSO success cannot replace the account selected by popup ($start)',
  async ({ start, success }) => {
    iframe();
    render(<Mount />);
    await boot();
    act(() => {
      emit(start, null, null, InteractionType.Popup);
      cached = [second];
      emit(success, result(second), null, InteractionType.Popup);
    });
    await state('authorized');
    await act(async () => silent[0].resolve(result(first)));
    expect(active).toEqual(second);
    expect(context()).toMatchObject({ account: 'second', roles: ['READ'] });
  }
);

test('a fresh different-account parent SSO cannot replace the selected user', async () => {
  iframe();
  cacheAccount();
  render(<Mount />);
  await state('authorized');
  const parent = startSso('different-parent-sid');
  await act(async () => {
    silent[0].resolve(result(second, jwt({ roles: ['OLD_WRITE'] })));
    await parent;
  });
  expect(active).toEqual(first);
  expect(context()).toMatchObject({
    account: 'first',
    authState: 'authorized',
    roles: ['READ'],
  });
  expect(startupRequests()).toHaveLength(1);
  expect(backendRequests()).toHaveLength(1);
  expect(photoRequests()).toHaveLength(1);
});

test('background silent token events do not reset authorization or trigger token retry loops', async () => {
  cacheAccount();
  render(<Mount />);
  await state('authorized');
  act(() => {
    emit(EventType.ACQUIRE_TOKEN_SUCCESS, result(first, 'photo'));
    emit(EventType.ACQUIRE_TOKEN_FAILURE, null, fail);
  });
  expect(context()).toMatchObject({ authState: 'authorized', roles: ['READ'] });
  expect(startupRequests()).toHaveLength(1);
  expect(backendRequests()).toHaveLength(1);
  expect(photoRequests()).toHaveLength(1);
  expect(instance.loginRedirect).not.toHaveBeenCalled();
});

test('photo never delays backend authorization or overwrites its outcome', async () => {
  cacheAccount();
  const photo = deferred<AuthenticationResult>();
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) =>
    isBackendRequest(request) ? result(first) : photo.promise
  );
  render(<Mount />);
  await state('authorized');
  await act(async () => photo.reject(fail));
  expect(context().authState).toBe('authorized');
  expect(instance.loginRedirect).not.toHaveBeenCalled();
});

test('a successful photo cannot authorize an invalid backend token', async () => {
  cacheAccount();
  vi.mocked(instance.acquireTokenSilent).mockImplementation(async (request) =>
    result(first, isBackendRequest(request) ? jwt({}) : 'photo')
  );
  vi.mocked(fetch).mockResolvedValue(new Response(new Blob(['photo'])));
  render(<Mount />);
  await state('unauthorized');
  await waitFor(() => expect(context().photo).toBe('blob:photo'));
  expect(context().authState).toBe('unauthorized');
  expect(context().roles).toBeUndefined();
  expect(instance.loginRedirect).not.toHaveBeenCalled();
});

test('withoutBackend authorizes the account even when optional photo remains pending', async () => {
  cacheAccount();
  vi.mocked(instance.acquireTokenSilent).mockReturnValue(
    new Promise(() => undefined)
  );
  render(<Mount withoutBackend />);
  await state('authorized');
  expect(startupRequests()).toHaveLength(1);
  expect(backendRequests()).toHaveLength(0);
  expect(photoRequests()).toEqual([
    { ...auth.GRAPH_REQUESTS_PHOTO, account: first },
  ]);
  expect(context().roles).toBeUndefined();
});

test('unmount makes late backend and photo completion inert', async () => {
  cacheAccount();
  const backend = deferred<AuthenticationResult>();
  const photo = deferred<AuthenticationResult>();
  vi.mocked(instance.acquireTokenSilent).mockImplementation((request) =>
    isBackendRequest(request) ? backend.promise : photo.promise
  );
  const mounted = render(<Mount />);
  await waitFor(() => {
    expect(startupRequests()).toHaveLength(1);
    expect(backendRequests()).toHaveLength(1);
    expect(photoRequests()).toHaveLength(1);
  });
  mounted.unmount();
  await act(async () => {
    backend.resolve(result());
    photo.resolve(result());
  });
  expect(fetch).not.toHaveBeenCalled();
  expect(URL.createObjectURL).not.toHaveBeenCalled();
});

test('custom loading and unauthorized elements keep their contract', async () => {
  iframe();
  render(<Mount withoutBackend withoutLoader={false} />);
  expect(screen.getByText('Custom loading')).toBeInTheDocument();
  await boot();
  await act(async () => silent[0].reject(fail));
  expect(screen.getByText('Custom unauthorized')).toBeInTheDocument();
  expect(screen.queryByText('Content')).not.toBeInTheDocument();
});
