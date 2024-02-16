import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { orca } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

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
  ({ size, iconOnly = false, withHover = true }, ref) => (
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
