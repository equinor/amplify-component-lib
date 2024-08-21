import { FC } from 'react';

import {
  LARGE_WAVES_PATH_DATA,
  SMALL_WAVES_PATH_DATA,
} from './ApplicationIcon.constants';

export interface WaveShapeWithNoiseProps {
  isAltWave?: boolean;
  hasLargeWaves?: boolean;
}

export const WaveShape: FC<WaveShapeWithNoiseProps> = ({
  isAltWave,
  hasLargeWaves,
}) => {
  return (
    <svg
      className={'waveShape'}
      width="100%"
      height="100%"
      viewBox="0 0 725 725"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="app-gradient" x1="0" y1="0%" x2="0" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>

      <g x="0" y="0" width="100%" height="100%">
        {!isAltWave ? (
          <path
            d={
              hasLargeWaves
                ? LARGE_WAVES_PATH_DATA[0]
                : SMALL_WAVES_PATH_DATA[0]
            }
            fill="url(#app-gradient)"
          />
        ) : (
          <path
            d={
              hasLargeWaves
                ? LARGE_WAVES_PATH_DATA[1]
                : SMALL_WAVES_PATH_DATA[1]
            }
            fill="url(#app-gradient)"
          />
        )}
      </g>
    </svg>
  );
};
