import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';
import { fallback } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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

const Fallback = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={fallback}
    shapes={shapes}
    {...props}
  />
));

Fallback.displayName = 'Fallback';

export default Fallback;
