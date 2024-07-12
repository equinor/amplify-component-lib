import { ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

interface IconItem {
  title: string;
  icon: IconData;
  color: string;
  colorBox?: ReactNode;
}

interface ElementItem {
  title: string;
  element: ReactNode;
}

export type GuidelineItem = IconItem | ElementItem;
