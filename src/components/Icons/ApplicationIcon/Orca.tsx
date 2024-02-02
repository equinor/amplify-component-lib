import { forwardRef } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { orca } from './ApplicationIconCollection';

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
  ({ size, iconOnly, withHover }, ref) => (
    <ApplicationIconBase
      size={size}
      iconOnly={iconOnly}
      iconData={orca}
      shapes={shapes}
      withHover={withHover}
      ref={ref}
    />
  )
);

Orca.displayName = 'Orca';

export default Orca;
