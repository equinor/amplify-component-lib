import { MotionValue, useScroll as ActualUseScroll } from 'framer-motion';

vi.mock('framer-motion', async () => {
  function useScroll(): ReturnType<typeof ActualUseScroll> {
    const zero: MotionValue<number> = new MotionValue(0);
    return {
      scrollX: zero,
      scrollY: zero,
      scrollXProgress: zero,
      scrollYProgress: zero,
    };
  }

  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll,
  };
});
