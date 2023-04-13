import { forwardRef } from 'react';

import { SvgIconProps } from '../index';
import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { dasha } from './ApplicationIconCollection';

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

const Dasha = forwardRef<HTMLDivElement, SvgIconProps>(({ size }, ref) => (
  <ApplicationIconBase size={size} iconData={dasha} shapes={shapes} ref={ref} />
));

Dasha.displayName = 'Dasha';

export default Dasha;
