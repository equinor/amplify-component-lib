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

export const LoggingQualification = forwardRef<HTMLDivElement, AppIconProps>(
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
          d="M23.9841 12.2667C24.4232 11.9111 25.0511 11.9111 25.4902 12.2667L27.7591 14.1042L30.2862 16.0761C30.6161 16.3335 30.8079 16.7294 30.8055 17.1479L30.7811 21.3118L30.8076 31.0318C30.8087 31.4488 30.617 31.8429 30.2882 32.0994L27.7591 34.0729L25.4902 35.9104C25.0511 36.266 24.4232 36.266 23.9841 35.9104L21.7152 34.0729L19.1861 32.0994C18.8573 31.8429 18.6656 31.4488 18.6668 31.0318L18.6932 21.3118L18.6688 17.1479C18.6664 16.7294 18.8582 16.3335 19.1881 16.0761L21.7152 14.1042L23.9841 12.2667Z"
          fill="#F5F5F5"
        />
      </svg>
    </ApplicationIconBase>
  )
);

LoggingQualification.displayName = 'LoggingQualification';
