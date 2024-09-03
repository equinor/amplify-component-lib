import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';
import { portal } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -16,
    left: -31,
    rotation: 339,
  },
  {
    top: 52,
    left: -5,
    rotation: 220,
  },
];

const Portal = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} iconData={portal} shapes={shapes} {...props} />
));

Portal.displayName = 'Portal';

export default Portal;
