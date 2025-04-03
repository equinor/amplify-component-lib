import { FC } from 'react';

import { NoiseSvg } from './NoiseSvg'; // Assuming it's another SVG file
import { WaveStaticSvg } from './WaveStaticSvg'; // Assuming it's an SVG file

interface WaveStaticProps {
  width: number;
  height: number;
  gradientColors?: string[];
}

export const WaveStatic: FC<WaveStaticProps> = ({
  width,
  height,
  gradientColors,
}) => {
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Render the WaveStaticSvg */}
      <WaveStaticSvg viewBox={viewBox} gradientColors={gradientColors} />

      {/* Render the NoiseSvg with blend mode "multiply" */}
      <g style={{ filter: 'grayscale(1)', mixBlendMode: 'color-burn' }}>
        <NoiseSvg viewBox={viewBox} />
      </g>
    </svg>
  );
};
