import { FC, useEffect, useRef, useState } from 'react';

import { Container } from './Waves.styles';
import { WaveStatic } from './WaveStatic';

export interface WavesProps {
  gradientColors?: string[];
}

export const Waves: FC<WavesProps> = ({ gradientColors }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(containerRef.current?.clientWidth ?? 0);
  const [height, setHeight] = useState(containerRef.current?.clientHeight ?? 0);

  const handleSetRef = (element: HTMLDivElement | null) => {
    containerRef.current = element;

    if (!containerRef.current) return;

    setWidth(containerRef.current.clientWidth);
    setHeight(containerRef.current.clientHeight);
  };

  useEffect(() => {
    const resizeHandler = () => {
      /* v8 ignore next */
      if (!containerRef.current) return;

      setWidth(containerRef.current.clientWidth);
      setHeight(containerRef.current.clientHeight);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <Container ref={handleSetRef}>
      <WaveStatic
        height={height}
        width={width}
        gradientColors={gradientColors}
      />
    </Container>
  );
};
