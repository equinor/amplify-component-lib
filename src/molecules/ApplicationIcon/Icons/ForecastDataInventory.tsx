import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { fdi } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

const shapes: ShapeProps[] = [
  {
    top: -24,
    left: -20,
    rotation: 325,
  },
  {
    top: 35,
    left: 12,
    rotation: 205,
  },
];

export const ForecastDataInventory = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase ref={ref} iconData={fdi} shapes={shapes} {...props} />
  )
);

ForecastDataInventory.displayName = 'ForecastDataInventory';
