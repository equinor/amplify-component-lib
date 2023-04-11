import { Meta, Story } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/AuthEnvironment/Environment',
} as Meta;

export const getConfig: Story = () => {
  const codeText = `
  getConfig(param: env variable name) => helper function to get environment variables
  `;
  return <UtilStory name="getConfig" codeText={codeText} />;
};

export const getAppName: Story = () => {
  const codeText = `
  getAppName() => gets APP_NAME env variable
  `;
  return <UtilStory name="getAppName" codeText={codeText} />;
};

export const getClientId: Story = () => {
  const codeText = `
  getClientId() => gets CLIENT_ID env variable
  `;
  return <UtilStory name="getClientId" codeText={codeText} />;
};

export const getApiUrl: Story = () => {
  const codeText = `
  getApiUrl() => gets API_URL env variable
  `;
  return <UtilStory name="getApiUrl" codeText={codeText} />;
};

export const getApiScope: Story = () => {
  const codeText = `
  getApiScope() => gets API_SCOPE env variable
  `;
  return <UtilStory name="getApiScope" codeText={codeText} />;
};

export const getEnvironmentName: Story = () => {
  const codeText = `
  getEnvironmentName() => gets ENVIRONMENT_NAME env variable
  `;
  return <UtilStory name="getEnvironmentName" codeText={codeText} />;
};

export const getIsMock: Story = () => {
  const codeText = `
  getIsMock() => gets IS_MOCK env variable
  `;
  return <UtilStory name="getIsMock" codeText={codeText} />;
};
