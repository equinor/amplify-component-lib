import React, { useContext, useEffect, useState } from 'react';
import {
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS,
  fetchMsGraph,
  msalApp,
} from './auth-utils';
import {
  Account,
  AuthError,
  AuthenticationParameters,
  InteractionRequiredAuthError,
} from 'msal';
import { createImageFromInitials } from '../stories/ProfilePicture';
import FullPageSpinner from '../stories/FullPageSpinner/FullPageSpinner';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export type AuthState = 'loading' | 'authorized' | 'unauthorized';

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

interface ContextValue {
  account: Account;
  authState: AuthState;
  photo: string;
  roles: string[];
  login: () => void;
  logout: () => void;
}

export const acquireToken = async (
  request: AuthenticationParameters = GRAPH_REQUESTS.LOGIN
) => {
  return await msalApp
    .acquireTokenSilent({
      ...request,
      redirectUri: `${window.location.origin}/auth.html`,
    })
    .then((token) => {
      if (!token?.accessToken) {
        console.log(`Token acquire is empty: ${JSON.stringify(token)}`);
        msalApp.acquireTokenRedirect(request);
        throw new Error('Redirecting');
      }
      return token;
    })
    //Acquire token silent failure, and send an interactive request
    .catch((error) => {
      console.log(`Token acquire error: ${JSON.stringify(error)}`);
      if (
        InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)
      ) {
        throw new Error('Redirecting');
      } else {
        throw new Error(`Non-interactive error: ${error.errorCode}`);
      }
    });
};

const AuthContext = React.createContext<Partial<ContextValue>>({});

const AuthProvider: React.FC = (props) => {
  const [account, setAccount] = useState<Account | undefined | null>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();

  const logRedirectCallbackErrors = (error: AuthError) => {
    if (error) {
      console.log(`Redirect callback error: ${JSON.stringify(error)}`);
      setAuthState('unauthorized');
      // Clear session to remove "login in process" error
      localStorage.clear();
    }
  };

  useEffect(() => {
    const account = msalApp.getAccount();
    setAccount(account);

    if (account) {
      msalApp.handleRedirectCallback(logRedirectCallbackErrors);

      acquireToken(GRAPH_REQUESTS.PHOTO).then(async (tokenResponse) => {
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
          } else {
            setPhoto(createImageFromInitials(account.name));
          }
        }
      });

      acquireToken(GRAPH_REQUESTS.BACKEND)
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
    } else {
      msalApp.handleRedirectCallback(logRedirectCallbackErrors);
      msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
    }
  }, [setAccount]);

  if (authState === 'loading') {
    return <FullPageSpinner />;
  } else {
    return (
      <AuthContext.Provider
        value={{
          account: account ?? undefined,
          photo,
          roles,
          authState,
          login,
          logout: () => msalApp.logout(),
        }}
        {...props}
      />
    );
  }
};

const login = () => {
  msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const isReaderOnly = (roles: string[] | undefined) => {
  if (roles) {
    const enrolledToWriterRole = roles.some((r) => r.includes('WRITE'));
    return !enrolledToWriterRole;
  } else {
    return true;
  }
};

export { AuthProvider, useAuth, isReaderOnly };
