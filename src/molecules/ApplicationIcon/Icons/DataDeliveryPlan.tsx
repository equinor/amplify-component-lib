import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import {
  ApplicationIconBase,
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -18,
    left: -17,
    rotation: 343,
  },
  {
    top: 40,
    left: 11,
    rotation: 200,
  },
];

export const DataDeliveryPlan = forwardRef<HTMLDivElement, AppIconProps>(
  (props, ref) => (
    <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39 36.1875C39 37.7408 37.7408 39 36.1875 39H11.8125C10.2592 39 9 37.7408 9 36.1875V11.8125C9.00003 10.2592 10.2592 9.00001 11.8125 9H24.9375C25.973 9 26.8125 9.83947 26.8125 10.875C26.8125 11.9105 25.973 12.75 24.9375 12.75H12.75V35.25H35.25V23.0625C35.25 22.027 36.0895 21.1875 37.125 21.1875C38.1605 21.1875 39 22.027 39 23.0625V36.1875Z"
          fill="#F7F7F7"
        />
        <path
          d="M34.558 10.7056C35.2657 9.92565 36.4853 9.85543 37.2813 10.5487C38.0773 11.242 38.149 12.437 37.4414 13.2169L25.714 26.1428L19.13 18.8855C18.4224 18.1056 18.4941 16.9106 19.2901 16.2173C20.0861 15.524 21.3057 15.5942 22.0133 16.3741L25.714 20.454L34.558 10.7056Z"
          fill="#F5F5F5"
        />
      </svg>
    </ApplicationIconBase>
  )
);

DataDeliveryPlan.displayName = 'DataDeliveryPlan';
