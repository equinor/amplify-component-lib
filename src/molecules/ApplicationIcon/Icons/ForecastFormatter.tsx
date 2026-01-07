import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import ApplicationIconBase, {
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';
import { forecastFormatter } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

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

export const ForecastFormatter = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase
      ref={ref}
      iconData={forecastFormatter}
      shapes={shapes}
      {...props}
    />
  )
);

ForecastFormatter.displayName = 'ForecastFormatter';
