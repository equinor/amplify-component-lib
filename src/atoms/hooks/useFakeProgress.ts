import { useEffect, useRef, useState } from 'react';

interface useFakeProgressProps {
  onDone: () => void;
  progressDelayMs?: number;
  finishedTimeoutMs?: number;
}

export function useFakeProgress({
  onDone,
  progressDelayMs = 250,
  finishedTimeoutMs = 4000,
}: useFakeProgressProps) {
  const usingProgressDelay = useRef<number>(progressDelayMs);
  const usingFinishedTimeoutMs = useRef<number>(finishedTimeoutMs);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  if (usingProgressDelay.current !== progressDelayMs) {
    throw new Error('progressDelayMs argument changed during run!');
  } else if (usingFinishedTimeoutMs.current !== finishedTimeoutMs) {
    throw new Error('finishedTimeoutMs argument changed during run!');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setFinished(true);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, usingProgressDelay.current);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        onDone();
      }, usingFinishedTimeoutMs.current);
    }
  }, [finished, onDone]);

  return { finished, progress };
}
