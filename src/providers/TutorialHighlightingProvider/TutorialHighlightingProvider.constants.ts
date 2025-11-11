import { MotionProps } from 'motion/react';

export const TUTORIAL_HIGHLIGHT_ANIMATION_PROPS: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.5, duration: 0.5 },
} as const;
