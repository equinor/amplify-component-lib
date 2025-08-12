import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/AuthEnvironment/Auth',
} as Meta;

export const FetchMsGraph: StoryFn = () => {
  const codeText = `
  fetchMsGraph(url: string, accessToken: string) => returns fetch with the accessToken appended to headers
  `;
  return <UtilStory name="fetchMsGraph" codeText={codeText} />;
};

export const GRAPH_SCOPES: StoryFn = () => {
  const codeText = `
const GRAPH_SCOPES = {
  OPENID: 'openid',
  PROFILE: 'profile',
  USER_READ: 'User.Read',
  API_SCOPE: getApiScope(),
};
  `;
  return <UtilStory name="GRAPH_SCOPES" codeText={codeText} />;
};

export const GRAPH_REQUESTS: StoryFn = () => {
  const codeText = `
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
  `;
  return <UtilStory name="GRAPH_REQUESTS" codeText={codeText} />;
};

export const GRAPH_ENDPOINTS: StoryFn = () => {
  const codeText = `
const GRAPH_ENDPOINTS = {
  PHOTO: 'https://graph.microsoft.com/v1.0/me/photos/96x96/$value',
};
  `;
  return <UtilStory name="GRAPH_ENDPOINTS" codeText={codeText} />;
};

export const MsalApp: StoryFn = () => {
  const codeText = `
  msalApp => Msal instance we use in AuthProvider
  `;
  return <UtilStory name="msalApp" codeText={codeText} />;
};

export const AcquireToken: StoryFn = () => {
  const codeText = `
  acquireToken(msalInstance, request) => returns token for the requested scope
  `;
  return <UtilStory name="acquireToken" codeText={codeText} />;
};

export const IsReaderOnly: StoryFn = () => {
  const codeText = `
  isReaderOnly(roles: string[]) => returns true if none of the roles include 'WRITE'
  `;
  return <UtilStory name="isReaderOnly" codeText={codeText} />;
};
