import { RefObject } from 'react';

import { useScroll, useTransform } from 'motion/react';

export function useReversedScrollY(contentRef: RefObject<HTMLElement | null>) {
  const { scrollY } = useScroll({
    container: contentRef,
  });

  return useTransform(scrollY, (value) => {
    // Wasn't able to test this, there is however a test that has scrolling highlighting
    /* v8 ignore next */
    if (value > 0) return value * -1;
    return 0;
  });
}
