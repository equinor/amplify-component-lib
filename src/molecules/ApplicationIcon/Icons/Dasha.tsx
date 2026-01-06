import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { dasha } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';
const shapes: ShapeProps[] = [
  {
    top: -25,
    left: -20,
    rotation: -5,
  },
  {
    top: 12,
    left: 45,
    rotation: -70,
  },
];

export const Dasha = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase iconData={dasha} shapes={shapes} ref={ref} {...props} />
));

Dasha.displayName = 'Dasha';
