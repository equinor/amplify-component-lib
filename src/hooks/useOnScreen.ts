import { useEffect, useState } from 'react';

// https://stackoverflow.com/a/65008608
export function useOnScreen(
  ref: { current: HTMLElement | null },
  threshold: number | number[] | undefined
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold }
    );

    if (ref.current) observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
}

export function useOnScreenMultiple(elements: (Element | null)[]) {
  const [isIntersecting, setIntersecting] = useState<boolean[]>(
    new Array(elements.length).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const [index, element] of elements.entries()) {
      if (element === null) continue;
      const observer = new IntersectionObserver(([entry]) => {
        setIntersecting((current) => {
          const newIntersecting = [...current];
          newIntersecting[index] = entry.isIntersecting;
          return newIntersecting;
        });
      });

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
