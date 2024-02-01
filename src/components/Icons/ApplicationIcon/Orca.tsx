import { forwardRef } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { depthConversion } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 328,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const Orca = forwardRef<HTMLDivElement, AppIconProps>(
  ({ size, iconOnly }, ref) => (
    <ApplicationIconBase
      size={size}
      iconOnly={iconOnly}
      iconData={depthConversion}
      shapes={shapes}
      ref={ref}
    />
  )
);

Orca.displayName = 'Orca';

export default Orca;
