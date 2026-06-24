import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { AuthProviderInner } from './AuthProviderInner';
import { auth, environment } from 'src/atoms/utils/auth_environment';

import { jwtDecode, JwtPayload } from 'jwt-decode';

const { msalApp, GRAPH_REQUESTS_LOGIN, GRAPH_REQUESTS_BACKEND } = auth;
const { getIsMock, getMockUserPhoto, getMockRoles, getApiScope } = environment;

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

export type AuthState =
  | 'loading'
  | 'authorized'
  | 'unauthorized'
  | 'interactionRequired';

export interface AuthContextType {
  account: AccountInfo | undefined;
  photo: string | undefined;
  roles: string[] | undefined;
  logout: () => void;
  authState: AuthState;
  /**
   * Trigger an interactive popup login. Useful when silent auth cannot
   * complete (e.g. embedded in an iframe where third-party cookies are
   * blocked). On success the context transitions to `authorized` in place,
   * with roles populated, without requiring a page reload.
   */
  login: () => Promise<void>;
  /**
   * Acquire a token interactively (popup) for the given scopes, falling back
   * to the configured API scope when none are provided.
   */
  acquireToken: (scopes?: string[]) => Promise<AuthenticationResult | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext provider');
  }
  return context;
};

export const MOCK_USER: Required<AccountInfo> = {
  homeAccountId: 'mock-home-account-id',
  environment: 'mock',
  tenantId: 'mock-tenant-id',
  username: 'MOCK@equinor.com',
  localAccountId: 'mock-local-account-id',
  name: 'Mock mocksnes',
  idToken: 'fake',
  idTokenClaims: { id: 'claim' },
  nativeAccountId: 'accountid',
  authorityType: 'authority',
  tenantProfiles: new Map(),
} as const;

interface AuthProviderProps {
  children: ReactNode;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
  withoutLoader?: boolean;
  withoutBackend?: boolean;
}

/**
 * @param children - ReactNode
 * @param loadingComponent - Component to show while auth is loading
 * @param unauthorizedComponent - Component to show if user is unauthorized
 * @param withoutLoader - Hide loader from AuthProvider
 * @param withoutBackend - Will not attempt to get roles from backend
 */
export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  loadingComponent,
  unauthorizedComponent,
  withoutLoader = false,
  withoutBackend = false,
}) => {
  const [account, setAccount] = useState<AccountInfo | undefined>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();
  const isMock = useMemo(() => getIsMock(import.meta.env.VITE_IS_MOCK), []);
  const mockPhoto = useMemo(
    () => getMockUserPhoto(import.meta.env.VITE_MOCK_USER_PHOTO),
    []
  );
  const mockRoles = useMemo(
    () => getMockRoles(import.meta.env.VITE_MOCK_ROLES),
    []
  );

  const apiScope = useMemo(
    () => getApiScope(import.meta.env.VITE_API_SCOPE),
    []
  );

  // Scopes requested when logging in interactively. We include the API scope
  // alongside the standard login scopes so the backend access token is cached
  // by the popup and roles can be decoded afterwards.
  const loginScopes = useMemo(
    () => [...GRAPH_REQUESTS_LOGIN.scopes, apiScope],
    [apiScope]
  );

  if (isMock) {
    if (authState === 'loading') {
      setTimeout(() => {
        setAuthState('authorized');
      }, 1000);
    }
    return (
      <AuthContext.Provider
        value={{
          roles: mockRoles,
          account: MOCK_USER,
          photo: mockPhoto,
          logout: () => console.log('Logged out the user!'),
          authState,
          login: () => {
            setAuthState('authorized');
            return Promise.resolve();
          },
          acquireToken: () => Promise.resolve(null),
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  const acquireToken = async (
    scopes?: string[]
  ): Promise<AuthenticationResult | null> => {
    try {
      return await msalApp.acquireTokenPopup({
        scopes: scopes ?? [apiScope],
      });
    } catch (error) {
      console.error('[AuthProvider] acquireTokenPopup failed', error);
      return null;
    }
  };

  const login = async (): Promise<void> => {
    const result = await msalApp.loginPopup({ scopes: loginScopes });
    if (result.account) {
      msalApp.setActiveAccount(result.account);
      setAccount(result.account);
    }

    // Re-evaluate roles and auth state in place so we transition from
    // interactionRequired to authorized without a page reload.
    try {
      const backendToken = await msalApp.acquireTokenSilent(
        GRAPH_REQUESTS_BACKEND(apiScope)
      );
      const decoded: ExtendedJwtPayload = jwtDecode(backendToken.accessToken);
      if (decoded.roles) {
        setRoles(decoded.roles);
      }
      setAuthState('authorized');
    } catch (error) {
      console.error(
        '[AuthProvider] Could not acquire roles after interactive login',
        error
      );
      // Leave state at interactionRequired so the consumer can offer a retry.
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        roles,
        account,
        photo,
        logout: () => msalApp.logoutRedirect(),
        authState,
        login,
        acquireToken,
      }}
    >
      <MsalProvider instance={msalApp}>
        <AuthProviderInner
          loadingComponent={loadingComponent}
          unauthorizedComponent={unauthorizedComponent}
          account={account}
          setAccount={setAccount}
          setRoles={setRoles}
          setPhoto={setPhoto}
          authState={authState}
          setAuthState={setAuthState}
          withoutLoader={withoutLoader}
          withoutBackend={withoutBackend}
        >
          {children}
        </AuthProviderInner>
      </MsalProvider>
    </AuthContext.Provider>
  );
};
