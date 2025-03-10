import { FC, useEffect, useState } from 'react';

import { NoiseSvg } from './NoiseSvg'; // Assuming it's another SVG file
import { WaveStaticSvg } from './WaveStaticSvg'; // Assuming it's an SVG file

interface WaveStaticProps {
  gradientColors?: string[];
}

export const WaveStatic: FC<WaveStaticProps> = ({ gradientColors }) => {
  const [viewBox, setViewBox] = useState(
    `0 0 ${window.innerWidth} ${window.innerHeight - 64}`
  );

  useEffect(() => {
    const resizeHandler = (event: Event) => {
      const target = event.target as Window;
      setViewBox(`0 0 ${target.innerWidth} ${target.innerHeight - 64}`);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

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
