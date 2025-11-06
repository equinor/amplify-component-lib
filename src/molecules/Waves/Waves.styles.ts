import { motion } from 'motion/react';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  position: absolute;
  > svg {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
  }
`;
