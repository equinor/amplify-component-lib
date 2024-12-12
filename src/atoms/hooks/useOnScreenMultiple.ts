import { useEffect, useState } from 'react';

// Not able to test IntersectionObservers in vitest :(
/* v8 ignore start */
export function useOnScreenMultiple(elements: (Element | null)[]) {
  const [isIntersecting, setIsIntersecting] = useState<boolean[]>(
    new Array(elements.length).fill(false)
  );

  const updateIsIntersecting = (index: number, value: boolean) => {
    setIsIntersecting((current) => {
      const newIntersecting = [...current];
      newIntersecting[index] = value;
      return newIntersecting;
    });
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    setIsIntersecting(new Array(elements.length).fill(false));

    for (const [index, element] of elements.entries()) {
      if (element === null) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          updateIsIntersecting(index, entry.isIntersecting);
        },
        { threshold: 1 }
      );

      observer.observe(element);

      observers.push(observer);
    }
    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [elements]);

  return isIntersecting;
}
/* v8 ignore end */
