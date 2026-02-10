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

export const ForecastDataInventory = forwardRef<HTMLDivElement, AppIconProps>(
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
          d="M22.9472 8.96824C23.5031 8.64729 24.1881 8.64732 24.744 8.96824L30.8877 12.515C31.7471 13.0112 32.0413 14.1099 31.5451 14.9692C31.049 15.8286 29.9503 16.1233 29.0909 15.6272L23.8456 12.5981L13.2193 18.7342V31.7042L23.8456 37.8397L34.4725 31.7042V28.0334L24.9083 33.6361C24.3534 33.9612 23.667 33.9645 23.1086 33.6455L18.9161 31.2497C18.0545 30.7574 17.7552 29.66 18.2476 28.7985C18.7399 27.9369 19.8373 27.6376 20.6989 28.1299L23.9883 30.0092L35.361 23.3478C35.9166 23.0224 36.6038 23.0195 37.1624 23.3396C37.7211 23.6599 38.0661 24.2544 38.0661 24.8984V32.7418C38.0661 33.3837 37.7235 33.9766 37.1677 34.2976L24.744 41.4707C24.1881 41.7915 23.503 41.7916 22.9472 41.4707L10.5241 34.2976C9.9682 33.9766 9.62569 33.3837 9.62567 32.7418V17.6966L9.62977 17.5767C9.66951 16.9815 10.003 16.4416 10.5241 16.1408L22.9472 8.96824Z"
          fill="white"
        />
        <path
          d="M34.7809 16.2752C35.6403 15.779 36.739 16.0732 37.2351 16.9326C37.7313 17.7919 37.4369 18.8906 36.5777 19.3868L24.9167 26.1195C24.2526 26.5029 23.4343 26.5029 22.7701 26.1195L18.8853 23.8765C18.0259 23.3803 17.7317 22.2816 18.2279 21.4222C18.724 20.5629 19.8227 20.2682 20.6821 20.7642L23.8434 22.5891L34.7809 16.2752Z"
          fill="white"
        />
      </svg>
    </ApplicationIconBase>
  )
);

ForecastDataInventory.displayName = 'ForecastDataInventory';
