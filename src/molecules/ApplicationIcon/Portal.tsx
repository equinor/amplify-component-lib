import { forwardRef } from 'react';

import { ApplicationIconBase, ShapeProps } from './ApplicationIconBase';
import { portal } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -31,
    rotation: 339,
  },
  {
    top: 52,
    left: -5,
    rotation: 220,
  },
];

export const Portal = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={portal} shapes={shapes} {...props} />
));

Portal.displayName = 'Portal';
