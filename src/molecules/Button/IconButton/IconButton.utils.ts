import type { ReactNode } from 'react';

import type { IconData } from '@equinor/eds-icons';

export const isIconData = (icon: IconData | ReactNode): icon is IconData =>
  typeof icon === 'object' && icon !== null && 'svgPathData' in icon;
