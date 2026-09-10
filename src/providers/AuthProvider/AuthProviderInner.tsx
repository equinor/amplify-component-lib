import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  BrowserAuthError,
  BrowserAuthErrorCodes,
  InteractionRequiredAuthError,
  InteractionType,
} from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-common';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';

import { auth, environment } from 'src/atoms/utils/auth_environment';
import { FullPageSpinner } from 'src/molecules/FullPageSpinner/FullPageSpinner';
import { MissingAccessToApp } from 'src/organisms/Status/collections/MissingAccessToApp';
import { AuthState } from 'src/providers/AuthProvider/AuthProvider';

import { jwtDecode, JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

const {
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS_LOGIN,
  GRAPH_REQUESTS_PHOTO,
  GRAPH_REQUESTS_BACKEND,
  fetchMsGraph,
  isInIframe,
} = auth;

const { getApiScope } = environment;

// How often (ms) to silently re-acquire a token and check whether the
// roles/groups claim has drifted from what's currently applied. AAD
// recomputes app role/group claims on every token issuance, so a plain
// silent (forceRefresh) reacquire is enough to detect access changes made
// by AccessIT without waiting for full token expiry or a re-login.
const ROLE_SYNC_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export interface AuthProviderInnerProps {
  children: ReactNode;
  account: AccountInfo | undefined;
  setAccount: (val: AccountInfo | undefined) => void;
  setPhoto: (val: string | undefined) => void;
  roles: string[] | undefined;
  setRoles: (val: string[] | undefined) => void;
  setPendingRoles: (val: string[] | undefined) => void;
  authState: AuthState;
  setAuthState: (val: AuthState) => void;
  withoutLoader: boolean;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
  withoutBackend: boolean;
}

const areRolesEqual = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().every((role, i) => role === [...b].sort()[i]);

export const AuthProviderInner: FC<AuthProviderInnerProps> = ({
  children,
  account,
  setAccount,
  setPhoto,
  roles,
  setRoles,
  setPendingRoles,
  authState,
  setAuthState,
  withoutLoader,
  loadingComponent,
  unauthorizedComponent,
  withoutBackend,
}) => {
  const { instance, accounts, inProgress } = useMsal();
  const { login, result, error, acquireToken } = useMsalAuthentication(
    InteractionType.Silent,
    GRAPH_REQUESTS_LOGIN
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const hasFetchedRolesAndPhoto = useRef(false);

  useEffect(() => {
    if (isInitialized) return;

    const handleInit = async () => {
      console.log('[AuthProvider] Initializing');
      await instance.initialize();
      console.log('[AuthProvider] Finished initializing');
      setIsInitialized(true);
    };

    handleInit().catch((error) => {
      console.error('[AuthProvider] Error during initialization', error);
    });
  }, [instance, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    if (
      error instanceof InteractionRequiredAuthError &&
      !isInIframe() &&
      authState !== 'unauthorized'
    ) {
      console.error(error);
      console.log(
        '[AuthProvider] No account found, need to login via. redirect'
      );
      login(InteractionType.Redirect, GRAPH_REQUESTS_LOGIN).catch((error) => {
        console.error('[AuthProvider] Error during login', error);
      });
    } else if (result?.account && !account) {
      console.log(
        '[AuthProvider] Found account in useMsalAuth result, setting that one as active'
      );
      instance.setActiveAccount(result.account);
      setAccount(result.account);
    } else if (accounts.length > 0 && !account) {
      console.log(
        '[AuthProvider] Found account in accounts array, setting that one as active'
      );
      instance.setActiveAccount(accounts[0]);
      setAccount(accounts[0]);
    } else if (
      error instanceof BrowserAuthError &&
      error.errorCode === BrowserAuthErrorCodes.monitorWindowTimeout
    ) {
      console.error(error);
      console.log(
        '[AuthProvider] Trying to login again via. redirect due to monitor window timeout'
      );
      login(InteractionType.Redirect, GRAPH_REQUESTS_LOGIN).catch((error) => {
        console.error('[AuthProvider] Error during login', error);
      });
    } else if (error) {
      console.error('[AuthProvider] Unexpected error:', error);
    }
  }, [
    account,
    accounts,
    error,
    instance,
    isInitialized,
    login,
    result,
    setAccount,
    authState,
  ]);

  useEffect(() => {
    if (
      !account ||
      !isInitialized ||
      hasFetchedRolesAndPhoto.current ||
      inProgress !== 'none'
    )
      return;
    hasFetchedRolesAndPhoto.current = true;

    const getPhoto = async () => {
      try {
        const tokenResponse = await acquireToken(
          InteractionType.Silent,
          GRAPH_REQUESTS_PHOTO
        );
        if (tokenResponse) {
          const graphResponse = await fetchMsGraph(
            GRAPH_ENDPOINTS.PHOTO,
            tokenResponse.accessToken
          );
          if (graphResponse.status === 404) return null;

          const graphPhoto = await graphResponse.blob();
          const url = window.URL ?? window.webkitURL;
          const blobUrl = url.createObjectURL(graphPhoto);
          setPhoto(blobUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getRoles = async () => {
      try {
        const tokenResponse = await acquireToken(
          InteractionType.Silent,
          GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE))
        );
        console.log('[AuthProvider] Successfully acquired token');
        if (tokenResponse && tokenResponse.accessToken) {
          console.log('[AuthProvider] Decoding token');
          const accessToken: ExtendedJwtPayload = jwtDecode(
            tokenResponse.accessToken
          );
          console.log('[AuthProvider] Token was valid');
          if (accessToken.roles) {
            console.log('[AuthProvider] Found roles');
            setRoles(accessToken.roles);
          } else {
            throw new Error('Could not find roles in token');
          }
          setAuthState('authorized');
        }
      } catch (error) {
        console.error(
          '[AuthProvider] Token error when trying to get roles!',
          error
        );
        setAuthState('unauthorized');
      }
    };

    const getPhotoAndRoles = async () => {
      await getPhoto();
      if (withoutBackend) {
        setAuthState('authorized');
      } else {
        await getRoles();
      }
    };

    getPhotoAndRoles();
  }, [
    account,
    acquireToken,
    error,
    isInitialized,
    inProgress,
    setAuthState,
    setPhoto,
    setRoles,
    withoutBackend,
  ]);

  // Periodically (and on tab focus) silently re-acquire the backend token and
  // compare its roles claim against what's currently applied. AAD recomputes
  // this claim from current group/app-role assignments every time a token is
  // issued, so this surfaces AccessIT changes without waiting for the token
  // to fully expire or the user to log out/in again.
  useEffect(() => {
    if (withoutBackend || !account || authState !== 'authorized') return;

    const checkForRoleChanges = async () => {
      try {
        const tokenResponse = await acquireToken(InteractionType.Silent, {
          ...GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE)),
          forceRefresh: true,
        });
        if (!tokenResponse?.accessToken) return;

        const { roles: newRoles }: ExtendedJwtPayload = jwtDecode(
          tokenResponse.accessToken
        );
        if (newRoles && roles && !areRolesEqual(newRoles, roles)) {
          console.log('[AuthProvider] Detected roles change', newRoles);
          setPendingRoles(newRoles);
        }
      } catch (error) {
        // Non-fatal: just skip this check, the interval will retry later.
        console.error('[AuthProvider] Error checking for role changes', error);
      }
    };

    const intervalId = setInterval(
      checkForRoleChanges,
      ROLE_SYNC_CHECK_INTERVAL_MS
    );
    window.addEventListener('focus', checkForRoleChanges);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', checkForRoleChanges);
    };
  }, [account, acquireToken, authState, roles, setPendingRoles, withoutBackend]);

  if (authState === 'unauthorized')
    return unauthorizedComponent ?? <MissingAccessToApp />;

  if (withoutLoader) return children;

  if (authState === 'loading' || account === undefined)
    return loadingComponent ?? <FullPageSpinner variant="application" />;

  return children;
};
