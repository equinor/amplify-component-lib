import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';
import { fourDInsight } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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
