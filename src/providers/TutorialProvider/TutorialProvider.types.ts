import { ReactElement } from 'react';

export type HighlightingInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type CustomTutorialComponent = {
  key: string;
  element: ReactElement;
};
