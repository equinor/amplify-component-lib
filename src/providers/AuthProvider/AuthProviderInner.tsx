import { FC, ReactElement, ReactNode, useEffect } from 'react';

import {
  AuthError,
  InteractionRequiredAuthError,
  InteractionStatus,
  InteractionType,
} from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-common';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';

import { auth } from '../../utils';
import { AuthState } from './AuthProvider';

import jwt_decode, { JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

const {
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS_LOGIN,
  GRAPH_REQUESTS_PHOTO,
  GRAPH_REQUESTS_BACKEND,
  fetchMsGraph,
  acquireToken,
} = auth;

const localStorageKey = 'amplify-authentication-has-refreshed';

type HasRefreshed = {
  value: boolean;
};

function getHasRefreshed(): boolean {
  const fromLocalStorage = window.localStorage.getItem(localStorageKey);
  if (fromLocalStorage === null) return false;
  return (JSON.parse(fromLocalStorage) as HasRefreshed).value;
}

function setHasRefreshed({ value }: HasRefreshed) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(value));
}

export interface AuthProviderInnerProps {
  loadingComponent: ReactElement;
  unauthorizedComponent: ReactElement;
  children: ReactNode;
  account: AccountInfo | undefined;
  setAccount: (val: AccountInfo | undefined) => void;
  photo: string | undefined;
  setPhoto: (val: string | undefined) => void;
  roles: string[] | undefined;
  setRoles: (val: string[] | undefined) => void;
  authState: AuthState;
  setAuthState: (val: AuthState) => void;
  apiScope: string;
}

const AuthProviderInner: FC<AuthProviderInnerProps> = ({
  children,
  loadingComponent,
  unauthorizedComponent,
  account,
  setAccount,
  photo,
  setPhoto,
  roles,
  setRoles,
  authState,
  setAuthState,
  apiScope,
}) => {
  const { instance, inProgress } = useMsal();
  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    GRAPH_REQUESTS_LOGIN
  );

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      console.error('Auth error!');
      console.error(error);
      console.log('Trying to log the user in with a redirect...');
      login(InteractionType.Redirect, GRAPH_REQUESTS_LOGIN);
    }
  }, [error, login]);

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (
      !account &&
      accounts.length > 0 &&
      inProgress === InteractionStatus.None &&
      authState === 'loading'
    ) {
      setAccount(accounts[0]);
    } else if (
      account &&
      inProgress === InteractionStatus.None &&
      authState === 'loading' &&
      !photo &&
      !roles
    ) {
      const hasRefreshed = getHasRefreshed();
      // Get photo
      acquireToken(instance, GRAPH_REQUESTS_PHOTO).then(
        async (tokenResponse) => {
          if (tokenResponse) {
            const graphPhoto = await fetchMsGraph(
              GRAPH_ENDPOINTS.PHOTO,
              tokenResponse.accessToken
            )
              .then((response) => {
                if (response.status === 200) return response.blob();
                if (response.status === 404) return null;
              })
              .catch((error) =>
                console.error('Failed to fetch profile photo', error)
              );

            if (graphPhoto) {
              const url = window.URL ?? window.webkitURL;
              const blobUrl = url.createObjectURL(graphPhoto);
              setPhoto(blobUrl);
            }
          }
        }
      );

      // Get roles
      acquireToken(instance, GRAPH_REQUESTS_BACKEND(apiScope))
        .then(async (tokenResponse) => {
          if (tokenResponse && tokenResponse.accessToken) {
            const accessToken: ExtendedJwtPayload = jwt_decode(
              tokenResponse.accessToken
            );
            if (accessToken.roles) {
              setRoles(accessToken.roles as string[]);
            }
            if (hasRefreshed) {
              setHasRefreshed({ value: false });
            }
            setAuthState('authorized');
          }
        })
        .catch((error: AuthError) => {
          console.log('Token error when trying to get roles!');
          console.error(error);
          if (hasRefreshed) {
            setAuthState('unauthorized');
          } else {
            // Hasn't refreshed automatically yet, refreshing...
            console.log('Trying an automatic refresh...');
            setHasRefreshed({ value: true });
            window.location.reload();
          }
        });
    }
  }, [
    account,
    authState,
    inProgress,
    instance,
    photo,
    roles,
    setAccount,
    setAuthState,
    setPhoto,
    setRoles,
    apiScope,
  ]);

  if (authState === 'loading') return loadingComponent;

  if (authState === 'unauthorized') return unauthorizedComponent;

  return <>{children}</>;
};

export default AuthProviderInner;
