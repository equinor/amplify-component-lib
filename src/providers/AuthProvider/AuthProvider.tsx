import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { auth } from '../../utils';
import AuthProviderInner from './AuthProviderInner';

const { msalApp } = auth;

const accounts = msalApp.getAllAccounts();
if (accounts.length > 0) {
  msalApp.setActiveAccount(accounts[0]);
}

msalApp.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalApp.setActiveAccount(account);
  }
});

export type AuthState = 'loading' | 'authorized' | 'unauthorized';

export interface AuthContextType {
  account: AccountInfo | undefined;
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

interface AuthProviderProps {
  children: ReactNode;
  loadingComponent: ReactElement;
  unauthorizedComponent: ReactElement;
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

  return (
    <AuthContext.Provider
      value={{ roles, account, photo, logout: msalApp.logoutPopup }}
    >
      <MsalProvider instance={msalApp}>
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
        >
          {children}
        </AuthProviderInner>
      </MsalProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
