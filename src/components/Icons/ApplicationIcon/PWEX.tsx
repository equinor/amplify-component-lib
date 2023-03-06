import { FC } from 'react';

import { SvgIconProps } from '../index';

const PWEX: FC<SvgIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={37}
      height={37}
    >
      <rect
        x={0.172}
        y={36.828}
        width={36}
        height={36}
        rx={8}
        transform="rotate(-90 .172 36.828)"
        fill="#C4C4C4"
      />
    </mask>
    <g mask="url(#a)">
      <g filter="url(#b)">
        <path
          d="M-8.14 37.088c11.179 37.084 29.472 16.804 37.221 2.027 11.086-17.547-3.048-37.904-17.449-41.43-13.6-3.33-30.95 2.318-19.772 39.403Z"
          fill="#004F55"
        />
      </g>
      <g filter="url(#c)">
        <path
          d="M19.025 13.68C10.18-8.578-5.33 16.01-7.84 32.761-12.522 49.304.917 46.26 6.376 44.655c.43-.127.865-.217 1.307-.292 7.751-1.327 19.938-9.057 11.342-30.684Z"
          fill="#007079"
        />
      </g>
      <g filter="url(#d)">
        <path
          d="M30.23-5.347C-6.545-8.78 17.998 29.752 39.847 44.932 60.29 63.19 64.42 41.792 65.582 33.386c.063-.453.16-.888.284-1.327 3.222-11.482.446-34.04-35.635-37.406Z"
          fill="#007079"
        />
      </g>
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.721 23.961a.526.526 0 0 0-.386.174l-3.247 3.518a.507.507 0 0 1-.624.114c-.346.189-.792-.079-.792-.548V10.436c0-.336.247-.608.551-.608h7.643c1.826 0 3.306 1.633 3.306 3.647V23.96H12.721Z"
      fill="#007079"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.672 27.22c0 .538.615.81.979.433l3.39-3.518a.56.56 0 0 1 .403-.174h15.652c.318 0 .576-.272.576-.608V10.436c0-.336-.258-.608-.576-.608h-7.479c-.955 0-1.82.41-2.445 1.073a3.352 3.352 0 0 0-2.445-1.073h-7.48c-.317 0-.575.272-.575.608v16.783Zm18.986-5.386h-7.48v-8.376c.01-.832.65-1.503 1.44-1.503h6.04v9.879Zm-15.486-9.006a1 1 0 1 0 0 2h4.1a1 1 0 1 0 0-2h-4.1Zm-1 4.4a1 1 0 0 1 1-1h4.1a1 1 0 1 1 0 2h-4.1a1 1 0 0 1-1-1Zm1 2.4a1 1 0 1 0 0 2h1.486a1 1 0 1 0 0-2h-1.486Z"
      fill="#fff"
    />
    <defs>
      <filter
        id="b"
        x={-15.72}
        y={-5.133}
        width={52.777}
        height={70.248}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_105_2764"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="effect1_dropShadow_105_2764"
          result="effect2_dropShadow_105_2764"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_105_2764"
          result="shape"
        />
      </filter>
      <filter
        id="c"
        x={-12.813}
        y={2.799}
        width={38.785}
        height={50.168}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_105_2764"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="effect1_dropShadow_105_2764"
          result="effect2_dropShadow_105_2764"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_105_2764"
          result="shape"
        />
      </filter>
      <filter
        id="d"
        x={7.35}
        y={-7.563}
        width={63.516}
        height={66.66}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_105_2764"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="effect1_dropShadow_105_2764"
          result="effect2_dropShadow_105_2764"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_105_2764"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default PWEX;
