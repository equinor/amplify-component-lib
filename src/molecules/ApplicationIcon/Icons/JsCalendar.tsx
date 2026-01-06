import { forwardRef } from 'react';

import { jscalendar } from '../ApplicationIconCollection';
import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -45,
    left: 1,
    rotation: 15,
  },
  {
    top: 72,
    left: -5,
    rotation: 220,
  },
];

export const AtWork = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase
    ref={ref}
    iconData={jscalendar}
    shapes={shapes}
    {...props}
  />
));

AtWork.displayName = 'atWork';
