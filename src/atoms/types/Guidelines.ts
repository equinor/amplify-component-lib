import { ReactElement, ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

export interface IconItem {
  title: string;
  icon: IconData;
  color: string;
  colorBox?: boolean;
}

export interface ElementItem {
  title: string;
  element: ReactNode;
}

export type GuidelineItem = IconItem | ElementItem | ReactElement;
