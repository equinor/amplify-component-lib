import { FC } from 'react';

import { SvgIconProps } from '../index';

const DepthConversion: FC<SvgIconProps> = ({ size }) => (
  <svg
    width={size ? size : '48'}
    height={size ? size : '48'}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="depth-conversion"
  >
    <mask
      id="mask0_310_146"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect
        x="48"
        y="48"
        width="48"
        height="48"
        rx="8"
        transform="rotate(180 48 48)"
        fill="#C4C4C4"
      />
    </mask>
    <g mask="url(#mask0_310_146)">
      <g filter="url(#filter0_dd_310_146)">
        <path
          d="M48.3459 59.0825C97.7925 44.1777 70.7513 19.7868 51.0499 9.45448C27.6526 -5.32741 0.510312 13.5189 -4.19077 32.7199C-8.6307 50.8541 -1.10068 73.9872 48.3459 59.0825Z"
          fill="#004F55"
        />
      </g>
      <g filter="url(#filter1_dd_310_146)">
        <path
          d="M16.1382 21.8601C-13.5375 33.6556 19.245 54.3359 41.5821 57.681C63.8446 63.9815 59.4996 45.6657 57.3789 38.5231C57.2498 38.0882 57.1575 37.6487 57.0855 37.2007C55.4253 26.879 45.1769 10.3177 16.1382 21.8601Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#filter2_dd_310_146)">
        <path
          d="M-3.23399 5.25288C-7.80929 54.2884 43.565 21.5651 63.8047 -7.56798C88.3148 -35.0096 59.2283 -40.4054 48.1842 -41.9133C47.7271 -41.9757 47.2977 -42.0725 46.8545 -42.2002C31.6136 -46.5904 1.27572 -43.0797 -3.23399 5.25288Z"
          fill="#007079"
        />
      </g>
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.1817 29.317C23.6634 29.6914 24.3378 29.6912 24.8192 29.3164L33.814 22.3137L34.6423 21.6722C35.3307 21.1392 35.3318 20.1001 34.6445 19.5656L24.8193 11.9237C24.3378 11.5492 23.6636 11.5492 23.1821 11.9237L13.3527 19.5688C12.6667 20.1023 12.6663 21.1389 13.3518 21.673L14.174 22.3137L23.1817 29.317ZM26.6491 16.7254L24 14.6624L21.1814 16.8573L24.0056 18.9284L26.6491 16.7254ZM28.8024 18.4022L26.2212 20.5532L29.0646 22.6383L31.6534 20.6224L28.8024 18.4022ZM24.1105 22.3121L26.8777 24.3414L24 26.5824L21.4082 24.564L24.1105 22.3121ZM16.3467 20.6224L19.255 22.8872L21.8948 20.6873L18.9945 18.5604L16.3467 20.6224Z"
      fill="#F7F7F7"
    />
    <path
      d="M23.9871 33.6489L14.9747 26.6419C14.4957 26.2696 13.8253 26.2696 13.3464 26.6421C12.6638 27.173 12.6638 28.2048 13.3464 28.7358L22.7726 36.0672C23.4948 36.629 24.5061 36.629 25.2284 36.0672L34.6463 28.7422C35.3334 28.2078 35.3338 27.1695 34.6472 26.6345C34.165 26.2588 33.4891 26.2585 33.0065 26.6338L23.9871 33.6489Z"
      fill="#F7F7F7"
    />
    <defs>
      <filter
        id="filter0_dd_310_146"
        x="-9.32276"
        y="2.13261"
        width="89.7463"
        height="68.7968"
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
        <feOffset dy="3.03125" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_310_146"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.02083" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_310_146"
          result="effect2_dropShadow_310_146"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_310_146"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_dd_310_146"
        x="0.25565"
        y="15.9103"
        width="62.9749"
        height="50.141"
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
        <feOffset dy="3.03125" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_310_146"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.02083" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_310_146"
          result="effect2_dropShadow_310_146"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_310_146"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_dd_310_146"
        x="-7.56252"
        y="-45.6147"
        width="84.9644"
        height="83.1155"
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
        <feOffset dy="3.03125" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_310_146"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.02083" />
        <feGaussianBlur stdDeviation="2.02083" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_310_146"
          result="effect2_dropShadow_310_146"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_310_146"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default DepthConversion;
