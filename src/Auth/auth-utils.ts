import { UserAgentApplication } from "msal";

export const fetchMsGraph = async (url: string, accessToken: string) => {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  API_SCOPE: "API_SCOPE",
};

export const GRAPH_REQUESTS = {
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

export const GRAPH_ENDPOINTS = {
  PHOTO: "https://graph.microsoft.com/v1.0/me/photos/96x96/$value",
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "CLIENT_ID",
    authority: "https://login.microsoftonline.com/StatoilSRM.onmicrosoft.com/",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
});
