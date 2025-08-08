import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

const meta: Meta = {
  title: 'Atoms/Utils/AuthEnvironment/Environment',
};

export default meta;

export const GetConfig: StoryFn = () => {
  const codeText = `
  getConfig(param: env variable name) => helper function to get environment variables
  `;
  return <UtilStory name="getConfig" codeText={codeText} />;
};

export const GetAppName: StoryFn = () => {
  const codeText = `
  getAppName() => gets APP_NAME env variable
  `;
  return <UtilStory name="getAppName" codeText={codeText} />;
};

export const GetClientId: StoryFn = () => {
  const codeText = `
  getClientId() => gets CLIENT_ID env variable
  `;
  return <UtilStory name="getClientId" codeText={codeText} />;
};

export const GetApiUrl: StoryFn = () => {
  const codeText = `
  getApiUrl() => gets API_URL env variable
  `;
  return <UtilStory name="getApiUrl" codeText={codeText} />;
};

export const GetApiScope: StoryFn = () => {
  const codeText = `
  getApiScope() => gets API_SCOPE env variable
  `;
  return <UtilStory name="getApiScope" codeText={codeText} />;
};

export const GetEnvironmentName: StoryFn = () => {
  const codeText = `
  getEnvironmentName() => gets ENVIRONMENT_NAME env variable
  `;
  return <UtilStory name="getEnvironmentName" codeText={codeText} />;
};

export const GetIsMock: StoryFn = () => {
  const codeText = `
  getIsMock() => gets IS_MOCK env variable
  `;
  return <UtilStory name="getIsMock" codeText={codeText} />;
};
