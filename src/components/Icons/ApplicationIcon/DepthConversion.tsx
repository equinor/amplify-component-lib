import { forwardRef } from 'react';

import { SvgIconProps } from '../index';
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

const DepthConversion = forwardRef<HTMLDivElement, SvgIconProps>(
  ({ size }, ref) => (
    <ApplicationIconBase
      size={size}
      iconData={depthConversion}
      shapes={shapes}
      ref={ref}
    />
  )
);

DepthConversion.displayName = 'DepthConversion';

export default DepthConversion;
