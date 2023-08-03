/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';
import { environment, auth } from 'src/utils';

const { getApiUrl } = environment;
const { GRAPH_REQUESTS_BACKEND, acquireToken, msalApp } = auth;

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

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

const getToken = async () => {
  return (
    await acquireToken(
      msalApp(environment.getClientId(import.meta.env.VITE_CLIENT_ID)),
      GRAPH_REQUESTS_BACKEND(
        environment.getApiScope(import.meta.env.VITE_API_SCOPE)
      )
    )
  ).accessToken;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: getApiUrl(import.meta.env.VITE_API_URL),
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: getToken,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
