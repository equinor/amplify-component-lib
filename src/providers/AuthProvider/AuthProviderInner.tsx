import { FC, ReactElement, ReactNode, useEffect } from 'react';

import {
  AuthenticationResult,
  AuthError,
  InteractionRequiredAuthError,
  InteractionType,
} from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-common';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';

import { AuthState } from './AuthProvider';
import { OpenAPI, OpenAPIConfig } from 'src/api';
import FullPageSpinner from 'src/components/Feedback/FullPageSpinner';
import Unauthorized from 'src/components/Feedback/Unauthorized';
import { auth, environment } from 'src/utils';

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
} = auth;

const { getApiScope } = environment;

export interface AuthProviderInnerProps {
  children: ReactNode;
  openApiConfig: OpenAPIConfig;
  account: AccountInfo | undefined;
  setAccount: (val: AccountInfo | undefined) => void;
  photo: string | undefined;
  setPhoto: (val: string | undefined) => void;
  roles: string[] | undefined;
  setRoles: (val: string[] | undefined) => void;
  authState: AuthState;
  setAuthState: (val: AuthState) => void;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
}

const AuthProviderInner: FC<AuthProviderInnerProps> = ({
  children,
  openApiConfig,
  account,
  setAccount,
  photo,
  setPhoto,
  roles,
  setRoles,
  authState,
  setAuthState,
  loadingComponent,
  unauthorizedComponent,
}) => {
  const { instance } = useMsal();
  const { login, result, error, acquireToken } = useMsalAuthentication(
    InteractionType.Silent,
    GRAPH_REQUESTS_LOGIN
  );

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      console.log('logging in....');
      login(InteractionType.Redirect, GRAPH_REQUESTS_LOGIN);
    }
  }, [login, error]);

  useEffect(() => {
    if (result?.account && account === undefined) {
      instance.setActiveAccount(result.account);
      setAccount(result.account);
      const getToken = async () => {
        // Since we already have an account we know that acquireToken will return AuthenticationResult
        const response = (await acquireToken(
          InteractionType.Silent,
          GRAPH_REQUESTS_BACKEND(import.meta.env.VITE_API_SCOPE)
        )) as AuthenticationResult;
        return response.accessToken;
      };
      // Setting the OpenAPI config that has been sent from the given app (src/api)
      openApiConfig.TOKEN = getToken;
      // Setting the amplify-components specific OpenAPI config
      OpenAPI.TOKEN = getToken;
    }
  }, [
    account,
    acquireToken,
    instance,
    openApiConfig,
    result?.account,
    setAccount,
  ]);

  useEffect(() => {
    if (account && !photo && !roles) {
      // Get photo
      acquireToken(InteractionType.Silent, GRAPH_REQUESTS_PHOTO).then(
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
      acquireToken(
        InteractionType.Silent,
        GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE))
      )
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
          console.log('Token error when trying to get roles!');
          console.error(error);
          setAuthState('unauthorized');
        });
    }
  }, [
    account,
    acquireToken,
    instance,
    photo,
    roles,
    setAuthState,
    setPhoto,
    setRoles,
  ]);

  if (authState === 'loading')
    return (
      loadingComponent || <FullPageSpinner variant="equinor" withoutScrim />
    );

  if (authState === 'unauthorized')
    return unauthorizedComponent || <Unauthorized />;

  return <>{children}</>;
};

export default AuthProviderInner;
