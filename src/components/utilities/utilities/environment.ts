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

export default { getAppName, getClientId, getApiUrl, getApiScope };
