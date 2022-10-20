import { Meta, Story } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/AuthEnvironment/Auth',
} as Meta;

export const FetchMsGraph: Story = () => {
  const codeText = `
  fetchMsGraph(url: string, accessToken: string) => returns fetch with the accessToken appended to headers
  `;
  return <UtilStory name="fetchMsGraph" codeText={codeText} />;
};

export const GRAPH_SCOPES: Story = () => {
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

export const GRAPH_REQUESTS: Story = () => {
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

export const GRAPH_ENDPOINTS: Story = () => {
  const codeText = `
const GRAPH_ENDPOINTS = {
  PHOTO: 'https://graph.microsoft.com/v1.0/me/photos/96x96/$value',
};
  `;
  return <UtilStory name="GRAPH_ENDPOINTS" codeText={codeText} />;
};

export const msalApp: Story = () => {
  const codeText = `
  msalApp => Msal instance we use in AuthProvider
  `;
  return <UtilStory name="msalApp" codeText={codeText} />;
};

export const acquireToken: Story = () => {
  const codeText = `
  acquireToken(msalInstance, request) => returns token for the requested scope
  `;
  return <UtilStory name="acquireToken" codeText={codeText} />;
};

export const isReaderOnly: Story = () => {
  const codeText = `
  isReaderOnly(roles: string[]) => returns true if none of the roles include 'WRITE'
  `;
  return <UtilStory name="isReaderOnly" codeText={codeText} />;
};
