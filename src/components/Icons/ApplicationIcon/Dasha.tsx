import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { dasha } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types';

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

const Dasha = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase iconData={dasha} shapes={shapes} ref={ref} {...props} />
));

Dasha.displayName = 'Dasha';

export default Dasha;
