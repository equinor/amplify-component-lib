/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';
import { auth, environment } from 'src/utils';
import { CancelablePromise } from 'src/api/core/CancelablePromise';
import { request as __request } from 'src/api/core/request';
import { getLocalStorage, updateLocalStorage } from 'src/hooks/useLocalStorage';
import { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';

const { getToken: getApplicationToken } = auth;
const { getApiUrl, getEnvironmentName } = environment;

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

const environmentName = getEnvironmentName(
  import.meta.env.VITE_ENVIRONMENT_NAME
);
const noLocalhostEnvironmentName =
  environmentName === 'localhost' ? 'development' : environmentName;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: 'include' | 'omit' | 'same-origin';
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};

export class TokenService {
  /**
   * @returns string Success
   * @throws ApiError
   */
  public static getAmplifyPortalToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/Token/AmplifyPortal',
    });
  }

  /**
   * @returns string Success
   * @throws ApiError
   */
  public static getAmplifyPortalProductionToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/Token/AmplifyPortal/Production',
    });
  }
}

const isJwtTokenExpired = (token: string) => {
  const decodedToken: JwtPayload = jwtDecode(token);
  const todayInSecUnix = new Date().getTime() / 1000;
  return decodedToken.exp && todayInSecUnix > decodedToken.exp;
};

const getToken = async (
  localStorageKey: string,
  tokenRequest: () => CancelablePromise<string>
) => {
  const localStorageToken = getLocalStorage(localStorageKey, '');
  if (localStorageToken.length !== 0 && !isJwtTokenExpired(localStorageToken)) {
    return localStorageToken;
  } else {
    const requestToken = await tokenRequest();
    updateLocalStorage(localStorageKey, requestToken);
    return requestToken;
  }
};

export const getPortalToken = async () => {
  return getToken(
    `amplify-portal-${environmentName}`,
    TokenService.getAmplifyPortalToken
  );
};

const getPortalProdToken = async () => {
  return getToken(
    `amplify-portal-production`,
    TokenService.getAmplifyPortalProductionToken
  );
};

export const OpenAPI: OpenAPIConfig = {
  BASE: getApiUrl(import.meta.env.VITE_API_URL),
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: getApplicationToken,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};

export const OpenAPI_Portal: OpenAPIConfig = {
  BASE: `https://api-amplify-portal-${noLocalhostEnvironmentName}.radix.equinor.com`,
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: getPortalToken,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
export const OpenAPI_Portal_Prod: OpenAPIConfig = {
  BASE: `https://api-amplify-portal-production.radix.equinor.com`,
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: getPortalProdToken,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
