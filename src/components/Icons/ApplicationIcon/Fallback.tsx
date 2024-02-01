import { forwardRef } from 'react';

import EquinorLogo from '../EquinorLogo';
import { AppIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { fallback } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -17,
    rotation: 355,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

const Fallback = forwardRef<HTMLDivElement, AppIconProps>(
  ({ size, iconOnly }, ref) => {
    if (iconOnly) {
      return <EquinorLogo size={size as any} color="white" />;
    }
    return (
      <ApplicationIconBase
        ref={ref}
        size={size}
        iconData={fallback}
        shapes={shapes}
      />
    );
  }
);

Fallback.displayName = 'Fallback';

export default Fallback;
