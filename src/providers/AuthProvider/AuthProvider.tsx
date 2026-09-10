import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AccountInfo } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { AuthProviderInner } from './AuthProviderInner';
import { auth, environment } from 'src/atoms/utils/auth_environment';

const { msalApp } = auth;
const { getIsMock, getMockUserPhoto, getMockRoles } = environment;

export type AuthState = 'loading' | 'authorized' | 'unauthorized';

export interface AuthContextType {
  account: AccountInfo | undefined;
  photo: string | undefined;
  roles: string[] | undefined;
  logout: () => void;
  authState: AuthState;
  /** True when a background check found the user's roles/groups changed since
   * login (e.g. an AccessIT group assignment was granted/revoked) and a newer
   * set of roles is available but not yet applied. Consuming apps can watch
   * this flag to prompt the user (e.g. a Snackbar "Refresh" action) instead
   * of requiring a full re-login. */
  rolesOutdated: boolean;
  /** Applies the freshly detected roles to context (no reload/re-login) and
   * clears `rolesOutdated`. */
  applyNewRoles: () => void;
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
  const [pendingRoles, setPendingRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();

  const applyNewRoles = () => {
    if (pendingRoles) {
      setRoles(pendingRoles);
      setPendingRoles(undefined);
    }
  };
  const isMock = useMemo(() => getIsMock(import.meta.env.VITE_IS_MOCK), []);
  const mockPhoto = useMemo(
    () => getMockUserPhoto(import.meta.env.VITE_MOCK_USER_PHOTO),
    []
  );
  const mockRoles = useMemo(
    () => getMockRoles(import.meta.env.VITE_MOCK_ROLES),
    []
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
          rolesOutdated: false,
          applyNewRoles: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        roles,
        account,
        photo,
        logout: () => msalApp.logoutRedirect(),
        authState,
        rolesOutdated: pendingRoles !== undefined,
        applyNewRoles,
      }}
    >
      <MsalProvider instance={msalApp}>
        <AuthProviderInner
          loadingComponent={loadingComponent}
          unauthorizedComponent={unauthorizedComponent}
          account={account}
          setAccount={setAccount}
          roles={roles}
          setRoles={setRoles}
          setPendingRoles={setPendingRoles}
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
