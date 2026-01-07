import { forwardRef } from 'react';

import { AppIconProps } from '../ApplicationIcon.types';
import { sam } from '../ApplicationIconCollection';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -18,
    left: -17,
    rotation: 343,
  },
  {
    top: 26,
    left: 11,
    rotation: 193,
  },
];

export const Sam = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={sam} shapes={shapes} {...props} />
));

Sam.displayName = 'Sam';
