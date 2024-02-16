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

const Fallback = forwardRef<HTMLDivElement, AppIconProps>(
  ({ size, iconOnly = false, withHover = true }, ref) => {
    return (
      <ApplicationIconBase
        ref={ref}
        size={size}
        iconData={fallback}
        iconOnly={iconOnly}
        withHover={withHover}
        shapes={shapes}
      />
    );
  }
);

Fallback.displayName = 'Fallback';

export default Fallback;
