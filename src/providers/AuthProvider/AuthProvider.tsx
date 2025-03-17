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
