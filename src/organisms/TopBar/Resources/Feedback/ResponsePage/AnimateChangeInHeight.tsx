import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { spacings } from 'src/atoms/style';

import { motion } from 'motion/react';
import styled from 'styled-components';

const AnimationWrapper = styled(motion.div)`
  display: flex;
  gap: ${spacings.large};
  height: auto;
  flex-direction: column;
  min-height: 30px;
`;
interface AnimateChangeInHeightProps {
  children: ReactNode;
}

export const AnimateChangeInHeight: FC<AnimateChangeInHeightProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        /* v8 ignore start */ // TODO: Look further into coverage for resize observer
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
        /* v8 ignore end */
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.3 }}
    >
      <AnimationWrapper ref={containerRef}>{children}</AnimationWrapper>
    </motion.div>
  );
};
