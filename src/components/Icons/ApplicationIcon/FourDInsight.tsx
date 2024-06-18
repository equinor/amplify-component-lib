import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { fourDInsight } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types';

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

const FourDInsight = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={fourDInsight}
    shapes={shapes}
    {...props}
  />
));
FourDInsight.displayName = 'FourDInsight';
export default FourDInsight;
