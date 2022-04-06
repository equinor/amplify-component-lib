import * as msal from '@azure/msal-browser';

import { environment } from '.';

const { getApiScope, getClientId } = environment;

const fetchMsGraph = async (url: string, accessToken: string) => {
  return await fetch(url, {
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

const GRAPH_ENDPOINTS = {
  PHOTO: 'https://graph.microsoft.com/v1.0/me/photos/96x96/$value',
};

const msalApp = new msal.PublicClientApplication({
  auth: {
    clientId: getClientId(),
    authority: 'https://login.microsoftonline.com/StatoilSRM.onmicrosoft.com/',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
});

const acquireToken = async (request = GRAPH_REQUESTS.LOGIN) => {
  return await msalApp
    .acquireTokenSilent({
      ...request,
      redirectUri: `${window.location.origin}/auth.html`,
    })
    .then((token) => {
      if (!token?.accessToken) {
        console.log(`Token acquire is empty: ${JSON.stringify(token)}`);
        msalApp.acquireTokenRedirect(request);
        throw new Error('Redirecting');
      }
      return token;
    })
    //Acquire token silent failure, and send an interactive request
    .catch((error) => {
      console.log(`Token acquire error: ${JSON.stringify(error)}`);
      localStorage.clear();
      if (
        msal.InteractionRequiredAuthError.isInteractionRequiredError(
          error.errorCode
        )
      ) {
        msalApp.acquireTokenRedirect(request);
        throw new Error('Redirecting');
      } else {
        console.error(`Non-interactive error: ${error.errorCode}`);
        window.location.reload();
        throw new Error('Reloading');
      }
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

export default {
  fetchMsGraph,
  GRAPH_SCOPES,
  GRAPH_REQUESTS,
  GRAPH_ENDPOINTS,
  msalApp,
  acquireToken,
  isReaderOnly,
};
