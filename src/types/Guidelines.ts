import { ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

type IconItem = {
  title: string;
  icon: IconData;
  color: string;
  colorBox?: ReactNode;
};

type ElementItem = {
  title: string;
  element: ReactNode;
};

export type GuidelineItem = IconItem | ElementItem;
