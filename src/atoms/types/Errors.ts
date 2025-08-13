import { ReactNode } from 'react';

import { ErrorType } from 'src/atoms/enums/Errors';

export interface ErrorContentType {
  type: ErrorType;
  illustration: ReactNode;
  title: string;
  description?: string;
  button?: { text?: string; onClick?: () => void };
}
