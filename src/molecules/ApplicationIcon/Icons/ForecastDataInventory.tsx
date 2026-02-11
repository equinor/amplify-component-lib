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
          d="M23.322 7.74821C23.8779 7.42725 24.5629 7.42729 25.1189 7.74821L31.2628 11.2951C32.1222 11.7913 32.4164 12.89 31.9202 13.7494C31.4241 14.6088 30.3253 14.9036 29.4659 14.4075L24.2204 11.3782L13.5937 17.5145V30.485L24.2204 36.6207L34.8477 30.485V26.8141L25.2832 32.417C24.7283 32.742 24.0418 32.7454 23.4834 32.4263L19.2908 30.0305C18.4291 29.5382 18.1299 28.4408 18.6222 27.5791C19.1146 26.7175 20.212 26.4182 21.0736 26.9106L24.3631 28.7899L35.7362 22.1283C36.2918 21.8029 36.9791 21.8 37.5377 22.1201C38.0965 22.4404 38.4414 23.035 38.4414 23.6789V31.5226C38.4414 32.1645 38.0989 32.7575 37.543 33.0785L25.1189 40.2519C24.563 40.5727 23.8778 40.5728 23.322 40.2519L10.8984 33.0785C10.3425 32.7575 10 32.1645 10 31.5226V16.4769L10.0041 16.357C10.0438 15.7618 10.3773 15.2219 10.8984 14.921L23.322 7.74821Z"
          fill="white"
        />
        <path
          d="M35.1562 15.0554C36.0156 14.5593 37.1143 14.8535 37.6105 15.7129C38.1066 16.5722 37.8123 17.6709 36.953 18.1671L25.2916 24.9001C24.6274 25.2835 23.8092 25.2835 23.145 24.9001L19.26 22.6569C18.4006 22.1607 18.1064 21.0621 18.6025 20.2027C19.0987 19.3433 20.1974 19.0485 21.0568 19.5446L24.2183 21.3696L35.1562 15.0554Z"
          fill="white"
        />
      </svg>
    </ApplicationIconBase>
  )
);

ForecastDataInventory.displayName = 'ForecastDataInventory';
