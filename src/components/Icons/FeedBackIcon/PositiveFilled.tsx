import { FC } from 'react';

import { SizeIconProps } from 'src/types';

const PositiveFilled: FC<SizeIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="positive-filled"
  >
    <rect x="0.5" y="0.5" width="47" height="47" rx="7.5" fill="#D5EAF4" />
    <path
      d="M36 24C36 25.5759 35.6896 27.1363 35.0866 28.5922C34.4835 30.0481 33.5996 31.371 32.4853 32.4853C31.371 33.5996 30.0481 34.4835 28.5922 35.0866C27.1363 35.6896 25.5759 36 24 36C22.4241 36 20.8637 35.6896 19.4078 35.0866C17.9519 34.4835 16.629 33.5996 15.5147 32.4853C14.4004 31.371 13.5165 30.0481 12.9134 28.5922C12.3104 27.1363 12 25.5759 12 24L24 24L36 24Z"
      fill="#007079"
    />
    <circle cx="16" cy="15" r="3" fill="#007079" />
    <circle cx="32" cy="15" r="3" fill="#007079" />
    <rect
      x="0.5"
      y="0.5"
      width="47"
      height="47"
      rx="7.5"
      stroke="#007079"
      strokeDasharray="4 4"
    />
  </svg>
);

export default PositiveFilled;
