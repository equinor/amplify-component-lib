import { FC, ReactElement, ReactNode, useEffect } from 'react';

import {
  AuthError,
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

const { GRAPH_ENDPOINTS, GRAPH_REQUESTS, fetchMsGraph, acquireToken } = auth;

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
}) => {
  const { instance, inProgress } = useMsal();
  useMsalAuthentication(InteractionType.Redirect);

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
      // Get photo
      acquireToken(instance, GRAPH_REQUESTS.PHOTO).then(
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
      acquireToken(instance, GRAPH_REQUESTS.BACKEND)
        .then(async (tokenResponse) => {
          if (tokenResponse && tokenResponse.accessToken) {
            const accessToken: ExtendedJwtPayload = jwt_decode(
              tokenResponse.accessToken
            );
            if (accessToken.roles) {
              setRoles(accessToken.roles as string[]);
            }
            setAuthState('authorized');
          }
        })
        .catch((error: AuthError) => {
          if (
            error.errorCode === 'consent_required' ||
            error.errorCode === 'interaction_required' ||
            error.errorCode === 'login_required' ||
            error.errorCode === 'no_tokens_found'
          ) {
            instance.loginRedirect(GRAPH_REQUESTS.LOGIN);
          } else {
            setAuthState('unauthorized');
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
  ]);

  if (authState === 'loading') return loadingComponent;

  if (authState === 'unauthorized') return unauthorizedComponent;

  return <>{children}</>;
};

export default AuthProviderInner;
