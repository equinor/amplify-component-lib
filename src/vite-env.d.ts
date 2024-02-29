/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  [key: string]: string | boolean;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_CLIENT_ID: string;
  VITE_NAME: string;
  VITE_API_URL: string;
  VITE_API_SCOPE: string;
  VITE_ENVIRONMENT_NAME: string;
  VITE_SERVICE_NOW_CONFIGURATION_ITEM: string;
  VITE_ALLOWED_PARENT_DOMAINS: string;
  ALLOWED_PARENT_DOMAINS: string;
  VITE_IS_MOCK?: string;
}
