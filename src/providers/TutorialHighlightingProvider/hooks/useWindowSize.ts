import { useEffect, useState } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

function getWindowSize(): WindowSize {
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    const handleOnResize = () => setWindowSize(getWindowSize());

    window.addEventListener('resize', handleOnResize);
    return () => window.removeEventListener('resize', handleOnResize);
  }, []);

  return windowSize;
}
