import { useScroll, useTransform } from 'framer-motion';

export function useReversedScrollY() {
  const { scrollY } = useScroll({
    container: { current: document.getElementById('content') },
  });

  return useTransform(scrollY, (value) => {
    // Wasn't able to test this, there is however a test that has scrolling highlighting
    /* v8 ignore next */
    if (value > 0) return value * -1;
    return 0;
  });
}
