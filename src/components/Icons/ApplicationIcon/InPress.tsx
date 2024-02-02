import { forwardRef } from 'react';

import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { inPress } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -31,
    left: -17,
    rotation: 343,
  },
  {
    top: 42,
    left: 32,
    rotation: 182,
  },
];

const InPress = forwardRef<HTMLDivElement, AppIconProps>(
  ({ size, iconOnly = false, withHover = true }, ref) => (
    <ApplicationIconBase
      ref={ref}
      size={size}
      iconData={inPress}
      iconOnly={iconOnly}
      withHover={withHover}
      shapes={shapes}
    />
  )
);

InPress.displayName = 'InPress';

export default InPress;
