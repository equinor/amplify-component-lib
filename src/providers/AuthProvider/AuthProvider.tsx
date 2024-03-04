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

import AuthProviderInner from './AuthProviderInner';
import { auth, environment } from 'src/utils';

const { msalApp } = auth;
const { getIsMock } = environment;

export type AuthState = 'loading' | 'authorized' | 'unauthorized';

export interface AuthContextType {
  account: AccountInfo | undefined;
  photo: string | undefined;
  roles: string[] | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext provider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  loadingComponent,
  unauthorizedComponent,
}) => {
  const [account, setAccount] = useState<AccountInfo | undefined>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();
  const isMock = useMemo(() => getIsMock(import.meta.env.VITE_IS_MOCK), []);

  if (isMock) {
    return (
      <AuthContext.Provider
        value={{
          roles: ['mock'],
          account: {
            homeAccountId: 'mock-home-account-id',
            environment: 'mock',
            tenantId: 'mock-tenant-id',
            username: 'MockUser@euquinor.com',
            localAccountId: 'mock-local-account-id',
            name: 'Mock mocksnes',
          },
          photo,
          logout: () => console.log('Logged out the user!'),
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
        >
          {children}
        </AuthProviderInner>
      </MsalProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
