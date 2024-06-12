import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { fallback } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 325,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const Fallback = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={fallback}
    shapes={shapes}
    {...props}
  />
));

Fallback.displayName = 'Fallback';

export default Fallback;
