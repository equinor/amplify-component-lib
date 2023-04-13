import { forwardRef } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { fourDInsight } from './ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -20,
    left: -17,
    rotation: 343,
  },
  {
    top: 46,
    left: 11,
    rotation: 193,
  },
];

const FourDInsight = forwardRef<HTMLDivElement, SvgIconProps>(
  ({ size }, ref) => (
    <ApplicationIconBase
      ref={ref}
      size={size}
      iconData={fourDInsight}
      shapes={shapes}
    />
  )
);
FourDInsight.displayName = 'FourDInsight';
export default FourDInsight;
