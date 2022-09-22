import { InteractionStatus } from '@azure/msal-browser';
import { FC, ReactElement, ReactNode, useEffect } from 'react';

import { auth } from '../../utils';
import { useMsal } from '@azure/msal-react';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { AccountInfo } from '@azure/msal-common';
import { AuthState } from './AuthProvider';

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

const { GRAPH_ENDPOINTS, GRAPH_REQUESTS, fetchMsGraph, acquireToken } = auth;

export interface AuthProviderInnerProps {
  loadingComponent: ReactElement;
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

  useEffect(() => {
    if (
      !account &&
      inProgress === InteractionStatus.None &&
      authState === 'loading'
    ) {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setAuthState('authorized');
      } else {
        instance
          .handleRedirectPromise()
          .then((response) => {
            if (response !== null && response.account) {
              setAccount(response.account);
              instance.setActiveAccount(response.account);
              setAuthState('authorized');
            }
          })
          .catch((error) => {
            console.log(`Redirect callback error: ${JSON.stringify(error)}`);
            setAuthState('unauthorized');
          });
      }
    } else if (
      account &&
      inProgress === InteractionStatus.None &&
      authState === 'authorized' &&
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
        .catch(() => {
          setAuthState('unauthorized');
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

  if (authState === 'loading') {
    return loadingComponent;
  }

  return <>{children}</>;
};

export default AuthProviderInner;
