import { PublicClientApplication } from '@azure/msal-browser';

import { EnvironmentType } from 'src/atoms/enums/Environment';

const OPTIONAL_ENV_VARIABLES = [
  'IS_MOCK',
  'ALLOWED_PARENT_DOMAINS',
  'SERVICE_NOW_CONFIGURATION_ITEM',
  'API_CLIENT_ID',
];

interface EnvVariables {
  CLIENT_ID: string;
  NAME: string;
  API_URL: string;
  API_SCOPE: string;
  API_CLIENT_ID: string;
  ENVIRONMENT_NAME: string;
  SERVICE_NOW_CONFIGURATION_ITEM: string;
  ALLOWED_PARENT_DOMAINS: string;
}

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
const getApiClientId = (apiClientId: string | undefined): string => {
  if (!apiClientId) {
    return getConfig('API_CLIENT_ID');
  }
  return apiClientId;
};

const getEnvironmentName = (
  environmentName: string | EnvironmentType | undefined
): EnvironmentType => {
  if (!environmentName) {
    return getConfig('ENVIRONMENT_NAME') as EnvironmentType;
  }
  return environmentName as EnvironmentType;
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

const getMockRoles = (mockedRoles: string | undefined): string[] => {
  if (mockedRoles === undefined) {
    return ['admin'];
  }
  return JSON.parse(mockedRoles) as string[];
};

const getAllowedParentDomains = (
  parentDomains: string | undefined
): string[] => {
  const raw = parentDomains ?? getConfig('ALLOWED_PARENT_DOMAINS') ?? '';
  // Filter out empty entries so a trailing ';' or an unset variable does not
  // produce a single empty-string origin that would match nothing.
  return raw.split(';').filter((domain) => domain.trim().length > 0);
};

/**
 * Extracts a session id (sid) from a postMessage payload. We accept several
 * shapes so different parent apps can integrate without coordinating on an
 * exact contract:
 *  - a raw string: `"the-sid"`
 *  - an object with a `sid` field: `{ sid: 'the-sid' }`
 *  - a typed object: `{ type: 'something', sid: 'the-sid' }`
 *
 * @returns the sid string, or undefined when none could be extracted.
 */
const getSidFromMessage = (data: unknown): string | undefined => {
  if (typeof data === 'string') {
    return data.length > 0 ? data : undefined;
  }
  if (
    data &&
    typeof data === 'object' &&
    'sid' in data &&
    typeof (data as { sid: unknown }).sid === 'string'
  ) {
    const sid = (data as { sid: string }).sid;
    return sid.length > 0 ? sid : undefined;
  }
  return undefined;
};

const getMockUserPhoto = (
  isMockingUserPhoto: string | undefined
): string | undefined => {
  if (isMockingUserPhoto === undefined) {
    return undefined;
  }

  return 'https://avatars.githubusercontent.com/u/97165289'; // IMG from faker.image.avatar
};
function getPortalWithoutLocalhost() {
  let environmentName: EnvironmentType | undefined = import.meta.env
    .VITE_ENVIRONMENT_NAME as EnvironmentType;
  if (!environmentName) {
    environmentName = getConfig('ENVIRONMENT_NAME') as EnvironmentType;
  }

  if (environmentName === EnvironmentType.PRODUCTION) {
    return 'https://jsembark.equinor.com';
  }

  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;

  return `https://client-amplify-portal-${environmentNameWithoutLocalHost}.radix.equinor.com`;
}

const PORTAL_URL_WITHOUT_LOCALHOST = getPortalWithoutLocalhost();

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
  },
});

const allowedParentDomains = getAllowedParentDomains(
  import.meta.env.ALLOWED_PARENT_DOMAINS
);

if (allowedParentDomains.length === 0) {
  // Greppable, one-time startup warning: without any allow-listed parent
  // origins the postMessage SSO path below can never run.
  console.warn(
    '[Auth] ALLOWED_PARENT_DOMAINS resolved empty - postMessage SSO is disabled. ' +
      'Set ALLOWED_PARENT_DOMAINS (semicolon-separated origins) to enable it.'
  );
}

// This code is needed to be able to embed our FE into another FE
// Msal documentation here:
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/iframe-usage.md#:%7E:text=Using%20MSAL%20in%20iframed%20apps%20By%20default%2C%20MSAL,redirect%20APIs%20for%20user%20interaction%20with%20the%20IdP%3A
//
// NOTE: ssoSilent with a sid is best-effort only. It opens a hidden iframe to
// login.microsoftonline.com and therefore fails when third-party cookies are
// blocked (e.g. embedded in another app). The reliable recovery path in that
// case is the `interactionRequired` auth state plus an interactive popup
// `login()` exposed from `useAuth()`.
window.addEventListener('message', async (event: MessageEvent) => {
  // Check that the origin is allowed
  if (!allowedParentDomains.includes(event.origin)) {
    if (event.data) {
      console.log(
        '[Auth] Ignoring postMessage from non-allow-listed origin',
        event.origin,
        'allow-list:',
        allowedParentDomains
      );
    }
    return;
  }

  const sid = getSidFromMessage(event.data);
  if (!sid) {
    if (event.data) {
      console.warn(
        '[Auth] Allowed origin sent a message without an extractable sid. Received shape:',
        event.data
      );
    }
    return;
  }

  await msalApp.initialize();

  try {
    await msalApp.ssoSilent({ sid });
    console.log('[Auth] postMessage successfully logged in user!');
  } catch (error) {
    console.error('[Auth] Something went wrong with postMessage ssoSilent');
    console.error(error);
  }
});

const getToken = async () => {
  if (getIsMock(import.meta.env.VITE_IS_MOCK)) return '';

  const activeAccount = msalApp.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
  const accounts = msalApp.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
    return '';
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
  getSidFromMessage,
};

export const environment = {
  getConfig,
  getAppName,
  getClientId,
  getApiUrl,
  getApiScope,
  getApiClientId,
  getEnvironmentName,
  getIsMock,
  getMockUserPhoto,
  getMockRoles,
  getServiceNowConfigurationItem,
  PORTAL_URL_WITHOUT_LOCALHOST,
};
