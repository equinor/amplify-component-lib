import { ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

export const isIconData = (icon: IconData | ReactNode): icon is IconData =>
  typeof icon === 'object' && icon !== null && 'svgPathData' in icon;
