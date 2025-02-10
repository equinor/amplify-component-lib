import { useScroll, useTransform } from 'framer-motion';

export function useReversedScrollY() {
  const { scrollY } = useScroll();
  return useTransform(scrollY, (value) => {
    if (value > 0) return value * -1;
    return 0;
  });
}
