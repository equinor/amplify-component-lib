import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { auth } from '../../utils';
import AuthProviderInner from './AuthProviderInner';

const { msalApp } = auth;

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
  loadingComponent: ReactElement;
  unauthorizedComponent: ReactElement;
  environments: { apiScope: string; clientId: string };
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  loadingComponent,
  unauthorizedComponent,
  environments,
}) => {
  const [account, setAccount] = useState<AccountInfo | undefined>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [photo, setPhoto] = useState<string | undefined>();

  const accounts = msalApp(environments.clientId).getAllAccounts();
  if (accounts.length > 0) {
    msalApp(environments.clientId).setActiveAccount(accounts[0]);
  }

  msalApp(environments.clientId).addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalApp(environments.clientId).setActiveAccount(account);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        roles,
        account,
        photo,
        logout: () => msalApp(environments.clientId).logoutRedirect(),
      }}
    >
      <MsalProvider instance={msalApp(environments.clientId)}>
        <AuthProviderInner
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
          apiScope={environments.apiScope}
        >
          {children}
        </AuthProviderInner>
      </MsalProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
