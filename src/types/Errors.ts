import { ReactNode } from 'react';

export enum ErrorType {
  ERROR_400 = '400',
  ERROR_401 = '401',
  ERROR_403 = '403',
  ERROR_404 = '404',
  ERROR_500 = '500',
  DEFAULT = 'default',
}

export type ErrorContentType = {
  type: ErrorType;
  illustration: ReactNode;
  title: string;
  description?: string;
  button?: { text?: string; onClick?: () => void };
};
