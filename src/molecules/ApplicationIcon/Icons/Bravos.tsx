import { forwardRef } from 'react';

import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import {
  ApplicationIconBase,
  ShapeProps,
} from 'src/molecules/ApplicationIcon/ApplicationIconBase';

const shapes: ShapeProps[] = [
  {
    top: -22,
    left: -17,
    rotation: 0,
  },
  {
    top: 40,
    left: 11,
    rotation: 200,
  },
];

export const Bravos = forwardRef<HTMLDivElement, AppIconProps>((props, ref) => (
  <ApplicationIconBase ref={ref} shapes={shapes} {...props}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.3136 24C31.3136 22.9662 30.61 22.065 29.607 21.8143L20.5572 19.5518C16.7035 18.5884 14 15.1258 14 11.1535V11.0148H16.8856V11.1535C16.8856 13.8017 18.688 16.1101 21.2571 16.7524L30.3069 19.0148C32.5944 19.5867 34.1992 21.6421 34.1992 24C34.1992 26.358 32.5944 28.4133 30.3069 28.9852L21.2571 31.2477C18.688 31.89 16.8856 34.1983 16.8856 36.8465V36.9852H14V36.8465C14 32.8742 16.7035 29.4117 20.5572 28.4482L29.607 26.1858C30.61 25.935 31.3136 25.0339 31.3136 24Z"
        fill="#99C6C9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5424 24C25.5424 22.8657 24.8388 21.8504 23.7767 21.4522L19.6172 19.8923C16.2384 18.6253 14 15.3953 14 11.7867V11.0148H16.8856V11.7867C16.8856 14.1924 18.3779 16.3458 20.6304 17.1905L24.7899 18.7503C26.9782 19.5709 28.428 21.6629 28.428 24C28.428 26.3372 26.9782 28.4291 24.7899 29.2498L20.6304 30.8096C18.3779 31.6543 16.8856 33.8076 16.8856 36.2133V36.9852H14V36.2133C14 32.6048 16.2384 29.3748 19.6172 28.1077L23.7767 26.5479C24.8388 26.1496 25.5424 25.1343 25.5424 24Z"
        fill="#CCE2E4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7713 24C19.7713 22.6376 19.1298 21.3547 18.0399 20.5373L17.4628 20.1045C15.2829 18.4696 14.0001 15.9038 14.0001 13.179V11.0148H16.8857V13.179C16.8857 14.9956 17.7409 16.7061 19.1941 17.796L19.7713 18.2288C21.5878 19.5912 22.6569 21.7294 22.6569 24C22.6569 26.2707 21.5878 28.4088 19.7713 29.7712L19.1941 30.2041C17.7409 31.294 16.8857 33.0045 16.8857 34.821V36.9852H14.0001V34.821C14.0001 32.0962 15.2829 29.5305 17.4628 27.8956L18.0399 27.4627C19.1298 26.6453 19.7713 25.3624 19.7713 24Z"
        fill="white"
      />
    </svg>
  </ApplicationIconBase>
));

Bravos.displayName = 'Bravos';
