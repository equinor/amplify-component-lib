import { forwardRef } from 'react';

import ApplicationIconBase, { ShapeProps } from './ApplicationIconBase';
import { bravos } from './ApplicationIconCollection';
import { AppIconProps } from 'src/atoms/types';

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

const Bravos = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={bravos} shapes={shapes} {...props} />
));

Bravos.displayName = 'Bravos';

export default Bravos;
