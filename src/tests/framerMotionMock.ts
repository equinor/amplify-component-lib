import { useScroll as ActualUseScroll } from 'motion/react';
import { MotionValue } from 'motion-dom';

vi.mock('motion/react', async () => {
  function useScroll(): ReturnType<typeof ActualUseScroll> {
    const zero = new MotionValue(0);
    return {
      scrollX: zero,
      scrollY: zero,
      scrollXProgress: zero,
      scrollYProgress: zero,
    };
  }

  const actual = await vi.importActual('motion/react');
  return {
    ...actual,
    useScroll,
  };
});
