import { ReactElement } from 'react';

export interface HighlightingInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CustomTutorialComponent {
  key: string;
  element: ReactElement;
}
