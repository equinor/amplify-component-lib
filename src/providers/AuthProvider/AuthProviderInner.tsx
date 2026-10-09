import {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  AuthenticationResult,
  BrowserAuthError,
  BrowserAuthErrorCodes,
  EventType,
  InteractionRequiredAuthError,
  InteractionStatus,
  InteractionType,
} from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-common';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';

import {
  auth,
  environment,
  getPendingSso,
  subscribePendingSso,
} from 'src/atoms/utils/auth_environment';
import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { MissingAccessToApp } from 'src/organisms/Status/collections/MissingAccessToApp';
import { AuthState } from 'src/providers/AuthProvider/AuthProvider';

import { jwtDecode, JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  roles?: unknown;
}

type AuthorizationResult =
  | { account: AccountInfo; roles: string[] }
  | { account: AccountInfo | undefined; error: unknown };

const {
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS_LOGIN,
  GRAPH_REQUESTS_PHOTO,
  GRAPH_REQUESTS_BACKEND,
  fetchMsGraph,
  isInIframe,
} = auth;

const { getApiScope } = environment;

const accountKey = (account: AccountInfo | null | undefined) =>
  account
    ? `${account.homeAccountId}:${account.localAccountId}:${account.tenantId}:${account.environment}`
    : undefined;

const requiresInteraction = (error: unknown) =>
  error instanceof InteractionRequiredAuthError ||
  (error instanceof BrowserAuthError &&
    error.errorCode === BrowserAuthErrorCodes.monitorWindowTimeout);

export interface AuthProviderInnerProps {
  children: ReactNode;
  account: AccountInfo | undefined;
  setAccount: (val: AccountInfo | undefined) => void;
  setPhoto: (val: string | undefined) => void;
  setRoles: (val: string[] | undefined) => void;
  authState: AuthState;
  setAuthState: (val: AuthState) => void;
  withoutLoader: boolean;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
  withoutBackend: boolean;
}

export const AuthProviderInner: FC<AuthProviderInnerProps> = ({
  children,
  account,
  setAccount,
  setPhoto,
  setRoles,
  authState,
  setAuthState,
  withoutLoader,
  loadingComponent,
  unauthorizedComponent,
  withoutBackend,
}) => {
  const { instance, accounts, inProgress } = useMsal();
  const { error } = useMsalAuthentication(
    InteractionType.Silent,
    GRAPH_REQUESTS_LOGIN
  );
  const pendingSso = useSyncExternalStore(subscribePendingSso, getPendingSso);
  const [initializationError, setInitializationError] = useState<unknown>();
  const [authorizationResult, setAuthorizationResult] =
    useState<AuthorizationResult>();
  const selectedAccount = useRef(account);

  const selectAccount = useCallback(
    (nextAccount: AccountInfo | null) => {
      const snapshot = nextAccount ? { ...nextAccount } : undefined;
      selectedAccount.current = snapshot;
      instance.setActiveAccount(snapshot ?? null);
      setAccount(snapshot);
      setRoles(undefined);
      setPhoto(undefined);
      setAuthState(snapshot ? 'loading' : 'unauthorized');
    },
    [instance, setAccount, setRoles, setPhoto, setAuthState]
  );

  useEffect(() => {
    const callbackId = instance.addEventCallback((message) => {
      if (message.eventType === EventType.ACTIVE_ACCOUNT_CHANGED) {
        const activeAccount = instance.getActiveAccount();
        if (accountKey(activeAccount) !== accountKey(selectedAccount.current))
          selectAccount(activeAccount);
        return;
      }

      const interactive =
        message.interactionType === InteractionType.Popup ||
        message.interactionType === InteractionType.Redirect;
      // A cached-account popup emits ACQUIRE_TOKEN_SUCCESS, which the
      // authentication hook does not observe. Silent token events are not login.
      if (
        message.eventType !== EventType.SSO_SILENT_SUCCESS &&
        !(
          interactive &&
          (message.eventType === EventType.LOGIN_SUCCESS ||
            message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)
        )
      )
        return;
      const response = message.payload as AuthenticationResult | null;
      if (!response?.account) return;
      const current = selectedAccount.current ?? instance.getActiveAccount();
      if (
        message.eventType === EventType.SSO_SILENT_SUCCESS &&
        current &&
        accountKey(current) !== accountKey(response.account)
      )
        return;
      selectAccount(response.account);
    });
    return () => {
      if (callbackId) instance.removeEventCallback(callbackId);
    };
  }, [instance, selectAccount]);

  useEffect(() => {
    // MsalProvider swallows initialize rejection and can remain in Startup.
    let cancelled = false;
    instance.initialize().catch((error) => {
      if (!cancelled) setInitializationError(error);
    });
    return () => {
      cancelled = true;
    };
  }, [instance]);

  useEffect(() => {
    if (initializationError || inProgress === InteractionStatus.Startup) return;
    const activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      if (accountKey(activeAccount) !== accountKey(selectedAccount.current))
        selectAccount(activeAccount);
    } else if (!selectedAccount.current && accounts.length > 0) {
      selectAccount(accounts[0]);
    }
  }, [instance, accounts, inProgress, initializationError, selectAccount]);

  useEffect(() => {
    if (selectedAccount.current !== account) return;
    const result =
      authorizationResult?.account === account
        ? authorizationResult
        : undefined;
    const roles = result && 'roles' in result ? result.roles : undefined;
    if (account && (withoutBackend || roles)) {
      setRoles(withoutBackend ? undefined : roles);
      setAuthState('authorized');
      return;
    }
    setRoles(undefined);
    if (initializationError) {
      setAuthState('unauthorized');
      return;
    }
    if (
      pendingSso > 0 ||
      inProgress !== InteractionStatus.None ||
      (account && !result)
    ) {
      setAuthState('loading');
      return;
    }
    if (!result && !error) return;
    const failure = result && 'error' in result ? result.error : error;
    if (isInIframe() || !requiresInteraction(failure)) {
      setAuthState('unauthorized');
      return;
    }
    setAuthState('loading');
    instance.loginRedirect(GRAPH_REQUESTS_LOGIN).catch((redirectError) => {
      if (selectedAccount.current !== account) return;
      console.error('[AuthProvider] Error during login', redirectError);
      setAuthorizationResult({
        account,
        error: new Error('Redirect login failed', { cause: redirectError }),
      });
    });
  }, [
    account,
    authorizationResult,
    withoutBackend,
    error,
    initializationError,
    inProgress,
    pendingSso,
    instance,
    setRoles,
    setAuthState,
  ]);

  useEffect(() => {
    if (!account || withoutBackend) return;
    let cancelled = false;
    const isCurrent = () =>
      !cancelled &&
      selectedAccount.current === account &&
      accountKey(instance.getActiveAccount()) === accountKey(account);
    setAuthorizationResult(undefined);
    const getRoles = async () => {
      try {
        const response = await instance.acquireTokenSilent({
          ...GRAPH_REQUESTS_BACKEND(
            getApiScope(import.meta.env.VITE_API_SCOPE)
          ),
          account,
        });
        if (!isCurrent()) return;
        if (!response?.accessToken) throw new Error('No backend access token');
        const token = jwtDecode<ExtendedJwtPayload>(response.accessToken);
        if (
          !Array.isArray(token.roles) ||
          !token.roles.every((role): role is string => typeof role === 'string')
        ) {
          throw new Error('Could not find roles in token');
        }
        setAuthorizationResult({ account, roles: token.roles });
      } catch (error) {
        if (!isCurrent()) return;
        console.error(
          '[AuthProvider] Token error when trying to get roles!',
          error
        );
        setAuthorizationResult({ account, error });
      }
    };
    void getRoles();
    return () => {
      cancelled = true;
    };
  }, [account, withoutBackend, instance]);

  useEffect(() => {
    if (!account) return;
    let cancelled = false;
    let photoUrl: string | undefined;
    const isCurrent = () =>
      !cancelled &&
      selectedAccount.current === account &&
      accountKey(instance.getActiveAccount()) === accountKey(account);

    const getPhoto = async () => {
      const response = await instance.acquireTokenSilent({
        ...GRAPH_REQUESTS_PHOTO,
        account,
      });
      if (!isCurrent() || !response?.accessToken) return;
      const graphResponse = await fetchMsGraph(
        GRAPH_ENDPOINTS.PHOTO,
        response.accessToken
      );
      if (!isCurrent() || !graphResponse.ok) return;
      const photo = await graphResponse.blob();
      if (!isCurrent()) return;
      photoUrl = URL.createObjectURL(photo);
      setPhoto(photoUrl);
    };

    void getPhoto().catch(() => undefined);

    return () => {
      cancelled = true;
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [account, instance, setPhoto]);

  if (authState === 'unauthorized')
    return unauthorizedComponent ?? <MissingAccessToApp />;

  if (withoutLoader) return children;

  if (authState === 'loading' || account === undefined)
    return loadingComponent ?? <FullPageSpinner variant="application" />;

  return children;
};
