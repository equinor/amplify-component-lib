import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

interface IConfig {
  CLIENT_ID: string;
  NAME: string;
  API_URL: string;
  API_SCOPE: string;
}

declare const window: any;

const getConfig = (param: keyof IConfig): string => {
  if (!window._env_) {
    return '';
  }
  if (!window._env_[param]) {
    throw new Error('Missing required environment variable: ' + param);
  }
  return window._env_[param];
};

const getAppName = (): string => {
  if (process.env.NODE_ENV === 'development') {
    const appName = process.env.REACT_APP_NAME;
    if (!appName) {
      throw Error('REACT_APP_NAME missing from environment');
    }
    return appName;
  } else {
    return getConfig('NAME');
  }
};

const getClientId = (): string => {
  if (process.env.NODE_ENV === 'development') {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    if (!clientId) {
      throw Error('REACT_APP_CLIENT_ID missing from environment');
    }
    return clientId;
  } else {
    return getConfig('CLIENT_ID');
  }
};

const getApiUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
      throw Error('REACT_APP_API_URL missing from environment');
    }
    return apiUrl;
  } else {
    return getConfig('API_URL');
  }
};

const getApiScope = (): string => {
  if (process.env.NODE_ENV === 'development') {
    const apiUrl = process.env.REACT_APP_API_SCOPE;
    if (!apiUrl) {
      throw Error('REACT_APP_API_SCOPE missing from environment');
    }
    return apiUrl;
  } else {
    return getConfig('API_SCOPE');
  }
};

const GRAPH_ENDPOINTS = {
  PHOTO: 'https://graph.microsoft.com/v1.0/me/photos/96x96/$value',
};

const fetchMsGraph = (url: string, accessToken: string) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const GRAPH_SCOPES = {
  OPENID: 'openid',
  PROFILE: 'profile',
  USER_READ: 'User.Read',
  API_SCOPE: getApiScope(),
};

const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [GRAPH_SCOPES.OPENID, GRAPH_SCOPES.PROFILE, GRAPH_SCOPES.USER_READ],
  },
  PHOTO: {
    scopes: [GRAPH_SCOPES.USER_READ],
  },
  BACKEND: {
    scopes: [GRAPH_SCOPES.API_SCOPE],
  },
};

const msalApp = new PublicClientApplication({
  auth: {
    clientId: getClientId(),
    authority: 'https://login.microsoftonline.com/StatoilSRM.onmicrosoft.com/',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    iframeHashTimeout: 10000,
  },
});

const acquireToken = async (
  instance: IPublicClientApplication,
  request = GRAPH_REQUESTS.LOGIN
) => {
  return instance.acquireTokenSilent({
    ...request,
    redirectUri: `${window.location.origin}/auth.html`,
  });
};

const isReaderOnly = (roles: string[] | undefined) => {
  if (roles) {
    const enrolledToWriterRole = roles.some((r) => r.includes('WRITE'));
    return !enrolledToWriterRole;
  } else {
    return true;
  }
};

export const auth = {
  fetchMsGraph,
  GRAPH_SCOPES,
  GRAPH_REQUESTS,
  GRAPH_ENDPOINTS,
  msalApp,
  acquireToken,
  isReaderOnly,
};

export const environment = {
  getConfig,
  getAppName,
  getClientId,
  getApiUrl,
  getApiScope,
};
