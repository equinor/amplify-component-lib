import { AccountInfo, AuthError } from '@azure/msal-browser';
import {
  FC,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { auth } from '../utils';

const { GRAPH_ENDPOINTS, GRAPH_REQUESTS, fetchMsGraph, msalApp, acquireToken } =
  auth;

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

export type AuthState = 'loading' | 'authorized' | 'unauthorized';

export interface AuthContextType {
  account: AccountInfo | undefined;
  authState: AuthState;
  photo: string | undefined;
  roles: string[] | undefined;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext provider');
  }
  return context;
};

export interface AuthProviderProps {
  loadingComponent: ReactElement;
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  loadingComponent,
}) => {
  const [account, setAccount] = useState<AccountInfo | undefined | null>(
    undefined
  );
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

  const handleAccountChange = useCallback(async () => {
    await msalApp
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse !== null) {
          setAccount(tokenResponse.account);
          msalApp.setActiveAccount(tokenResponse.account);
        }
      })
      .catch(logRedirectCallbackErrors);

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
  }, []);

  const handleLogin = useCallback(async () => {
    await msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
    await msalApp
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse !== null) {
          setAccount(tokenResponse.account);
          msalApp.setActiveAccount(tokenResponse.account);
        }
      })
      .catch(logRedirectCallbackErrors);
  }, []);

  const handleSetAccountChanged = useCallback(async () => {
    await msalApp
      .handleRedirectPromise()
      .then((tokenResponse) => {
        if (tokenResponse !== null) {
          setAccount(tokenResponse.account);
          msalApp.setActiveAccount(tokenResponse.account);
        }
      })
      .catch(logRedirectCallbackErrors);

    const accounts = msalApp.getAllAccounts();
    if (accounts.length > 0) {
      msalApp.setActiveAccount(accounts[0]);
      setAccount(accounts[0]);
    }

    const activeAccount = msalApp.getActiveAccount();
    if (activeAccount !== undefined && activeAccount !== null) {
      await handleAccountChange();
      msalApp.setActiveAccount(activeAccount);
    } else {
      await handleLogin();
    }
    setAccount(activeAccount);
  }, [handleAccountChange, handleLogin]);

  useEffect(() => {
    handleSetAccountChanged();
  }, [setAccount, handleSetAccountChanged]);

  if (authState === 'loading') {
    return loadingComponent;
  } else {
    return (
      <AuthContext.Provider
        value={{
          account: account ?? undefined,
          photo,
          roles,
          authState,
          logout: () => msalApp.logoutRedirect(),
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
