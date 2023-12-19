import { PublicClientApplication } from '@azure/msal-browser';

import { EnvironmentType } from '../components';

interface RequiredEnvVariables {
  CLIENT_ID: string;
  NAME: string;
  API_URL: string;
  API_SCOPE: string;
  ENVIRONMENT_NAME: string;
  PORTAL_PROD_CLIENT_ID: string;
  SERVICE_NOW_CONFIGURATION_ITEM: string;
}

interface OptionalEnvVariables {
  ALLOWED_PARENT_DOMAINS: string;
}

const OPTIONAL_ENV_VARIABLES = ['IS_MOCK', 'ALLOWED_PARENT_DOMAINS'];

type EnvVariables = RequiredEnvVariables & OptionalEnvVariables;

declare const window: { _env_: EnvVariables | undefined } & Window;

const getConfig = (param: keyof EnvVariables) => {
  if (!window._env_) {
    return '';
  }
  if (
    window._env_[param] === undefined &&
    !OPTIONAL_ENV_VARIABLES.includes(param)
  ) {
    throw new Error('Missing required environment variable: ' + param);
  }
  return window._env_[param];
};

const getAppName = (appName: string | undefined): string => {
  if (!appName) {
    return getConfig('NAME');
  }
  return appName;
};

const getClientId = (clientId: string | undefined): string => {
  if (!clientId) {
    return getConfig('CLIENT_ID');
  }
  return clientId;
};

const getApiUrl = (apiUrl: string | undefined): string => {
  if (!apiUrl) {
    return getConfig('API_URL');
  }
  return apiUrl;
};

const getApiScope = (apiScope: string | undefined): string => {
  if (!apiScope) {
    return getConfig('API_SCOPE');
  }
  return apiScope;
};

const getEnvironmentName = (
  environmentName: string | EnvironmentType | undefined
): EnvironmentType => {
  if (!environmentName) {
    return getConfig('ENVIRONMENT_NAME') as EnvironmentType;
  }
  return environmentName as EnvironmentType;
};

const getPortalProdClientId = (
  portalProdClientId: string | undefined
): string => {
  if (!portalProdClientId) {
    return getConfig('PORTAL_PROD_CLIENT_ID');
  }
  return portalProdClientId;
};

const getServiceNowConfigurationItem = (
  configurationItem: string | undefined
): string => {
  if (!configurationItem) {
    return getConfig('SERVICE_NOW_CONFIGURATION_ITEM');
  }
  return configurationItem;
};

const getIsMock = (isMock: string | undefined): boolean => {
  if (isMock === undefined) {
    return false;
  }
  return isMock === 'true';
};

const getAllowedParentDomains = (
  parentDomains: string | undefined
): string[] => {
  if (!parentDomains) {
    return getConfig('ALLOWED_PARENT_DOMAINS')?.split(';') || [];
  }
  return parentDomains.split(';');
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
};

const GRAPH_REQUESTS_LOGIN = {
  scopes: [GRAPH_SCOPES.OPENID, GRAPH_SCOPES.PROFILE, GRAPH_SCOPES.USER_READ],
};

const GRAPH_REQUESTS_PHOTO = {
  scopes: [GRAPH_SCOPES.USER_READ],
};

const GRAPH_REQUESTS_BACKEND = (apiScope: string) => ({
  scopes: [apiScope],
});

const isInIframe = (): boolean => {
  return window.self !== window.top;
};

const msalApp = new PublicClientApplication({
  auth: {
    clientId: getClientId(import.meta.env.VITE_CLIENT_ID),
    authority: 'https://login.microsoftonline.com/StatoilSRM.onmicrosoft.com/',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});

const allowedParentDomains = getAllowedParentDomains(
  import.meta.env.ALLOWED_PARENT_DOMAINS
);

// This code is needed to be able to embed our FE into another FE
// Msal documentation here:
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/iframe-usage.md#:%7E:text=Using%20MSAL%20in%20iframed%20apps%20By%20default%2C%20MSAL,redirect%20APIs%20for%20user%20interaction%20with%20the%20IdP%3A
window.addEventListener('message', async (event: MessageEvent) => {
  // Check that the origin is allowed
  if (allowedParentDomains.includes(event.origin)) {
    const sid = event.data;
    if (sid) {
      await msalApp.initialize();

      try {
        await msalApp.ssoSilent({ sid });
        console.log('postMessage successfully logged in user!');
      } catch (error) {
        console.error('Something went wrong with postMessage');
        console.error(error);
      }
    }
  }
});

const getToken = async () => {
  const activeAccount = msalApp.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
  const accounts = msalApp.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
  }

  const authResult = await msalApp.acquireTokenSilent(
    GRAPH_REQUESTS_BACKEND(getApiScope(import.meta.env.VITE_API_SCOPE))
  );

  return authResult.accessToken;
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
  GRAPH_REQUESTS_LOGIN,
  GRAPH_REQUESTS_PHOTO,
  GRAPH_REQUESTS_BACKEND,
  GRAPH_ENDPOINTS,
  msalApp,
  getToken,
  isReaderOnly,
  isInIframe,
};

export const environment = {
  getConfig,
  getAppName,
  getClientId,
  getApiUrl,
  getApiScope,
  getEnvironmentName,
  getPortalProdClientId,
  getIsMock,
  getServiceNowConfigurationItem,
};
