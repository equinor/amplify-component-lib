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

  if (authState === 'unauthorized')
    return unauthorizedComponent ?? <MissingAccessToApp />;

  if (withoutLoader) return children;

  if (authState === 'loading' || account === undefined)
    return loadingComponent ?? <FullPageSpinner variant="application" />;

  return children;
};
