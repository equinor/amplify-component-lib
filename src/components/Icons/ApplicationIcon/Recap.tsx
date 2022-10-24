import { FC } from 'react';

import { SvgIconProps } from '../index';

const Recap: FC<SvgIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="recap"
  >
    <mask
      id="data-tracker-mask0"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect width="48" height="48" rx="8" fill="#C4C4C4" />
    </mask>
    <g mask="url(#data-tracker-mask0)">
      <path
        d="M-2.89611 25.1392C-25.9902 65.1395 16.8691 53.7048 41.1855 42.9874C71.7314 31.3192 64.7869 16.1548 57.1032 9.612C56.7713 9.32938 56.4612 9.03867 56.1633 8.72042C45.6594 -2.50048 19.8752 -14.3019 -2.89611 25.1392Z"
        fill="#004F55"
      />
      <g filter="url(#data-tracker-filter0_dd)">
        <path
          d="M40.3192 56.9534C68.2434 40.8313 30.6795 25.2832 12.2375 23.2749C-10.1183 19.6966 -4.15923 38.1388 -1.45111 45.2153C-1.2953 45.6224 -1.17429 46.0341 -1.07178 46.4578C1.45738 56.9119 12.9541 72.7526 40.3192 56.9534Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#data-tracker-filter1_dd)">
        <path
          d="M-5.14656 19.3673C-13.4919 50.5127 13.3426 35.0582 27.8031 23.4378C46.6949 9.75933 43.9772 -7.85427 32.5999 -11.6779C21.8546 -15.2891 3.19882 -11.7781 -5.14656 19.3673Z"
          fill="#007079"
        />
      </g>
      <path
        d="M16 24L21.3333 30L32 18"
        stroke="#F5F5F5"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <filter
        id="data-tracker-filter0_dd"
        x="-15"
        y="17"
        width="72.6091"
        height="60.8742"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="data-tracker-filter1_dd"
        x="-10.7221"
        y="-14.826"
        width="56.288"
        height="59.5365"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Recap;
