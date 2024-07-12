import { FC } from 'react';

import {
  LARGE_WAVES_PATH_DATA,
  SMALL_WAVES_PATH_DATA,
} from './ApplicationIcon.constants';

export interface WaveShapeWithNoiseProps {
  index?: number;
  isAltWave?: boolean;
  hasLargeWaves?: boolean;
}

export const WaveShape: FC<WaveShapeWithNoiseProps> = ({
  index,
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
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.5}
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <linearGradient id="gradient" x1="0" y1="0%" x2="0" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>

      <g id={'wavePattern' + index} x="0" y="0" width="100%" height="100%">
        {!isAltWave ? (
          <path
            d={
              hasLargeWaves
                ? LARGE_WAVES_PATH_DATA[0]
                : SMALL_WAVES_PATH_DATA[0]
            }
            fill="url(#gradient)"
          />
        ) : (
          <path
            d={
              hasLargeWaves
                ? LARGE_WAVES_PATH_DATA[1]
                : SMALL_WAVES_PATH_DATA[1]
            }
            fill="url(#gradient)"
          />
        )}
      </g>
    </svg>
  );
};
