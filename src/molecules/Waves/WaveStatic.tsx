import { FC } from 'react';

import { NoiseSvg } from './NoiseSvg'; // Assuming it's another SVG file
import WaveStaticSvg from './WaveStaticSvg'; // Assuming it's an SVG file

export const WaveStatic: FC = () => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Render the WaveStaticSvg */}
    <WaveStaticSvg />

    {/* Render the NoiseSvg with blend mode "multiply" */}
    <g style={{ filter: 'grayscale(1)', mixBlendMode: 'color-burn' }}>
      <NoiseSvg />
    </g>
  </svg>
);
