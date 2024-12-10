import { forwardRef } from 'react';

import { AppIconProps } from '../ApplicationIcon.types';
import ApplicationIconBase, { ShapeProps } from '../ApplicationIconBase';
import { sam } from '../ApplicationIconCollection';

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
