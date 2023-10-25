import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { AccountInfo } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import AuthProviderInner from './AuthProviderInner';
import { OpenAPIConfig } from 'src/api';
import { auth, environment } from 'src/utils';

const { createMsalApp } = auth;

const msalApp = createMsalApp(
  environment.getClientId(import.meta.env.VITE_CLIENT_ID)
);

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
  openApiConfig: OpenAPIConfig;
  loadingComponent?: ReactElement;
  unauthorizedComponent?: ReactElement;
  isMock?: boolean;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  openApiConfig,
  loadingComponent,
  unauthorizedComponent,
  isMock = false,
}) => {
  const [account, setAccount] = useState<AccountInfo | undefined>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();

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
          openApiConfig={openApiConfig}
          loadingComponent={loadingComponent}
          unauthorizedComponent={unauthorizedComponent}
          account={account}
          setAccount={setAccount}
          roles={roles}
          setRoles={setRoles}
          photo={photo}
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
