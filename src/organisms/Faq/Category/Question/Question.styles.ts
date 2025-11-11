import { HEADER_HEIGHT } from '../../Faq.utils';
import { colors, shape, spacings } from 'src/atoms';

import { motion } from 'motion/react';
import { styled } from 'styled-components';

export const Container = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: ${spacings.medium};
  padding: 0 ${spacings.medium};
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  background: ${colors.ui.background__default.rgba};
  border-left: 1px solid ${colors.ui.background__heavy.rgba};
  border-right: 1px solid ${colors.ui.background__heavy.rgba};
  border-bottom: 1px solid ${colors.ui.background__heavy.rgba};
  &:first-child {
    border-top-left-radius: ${shape.corners.borderRadius};
    border-top-right-radius: ${shape.corners.borderRadius};
    border-top: 1px solid ${colors.ui.background__heavy.rgba};
  }
  &:last-child {
    border-bottom-left-radius: ${shape.corners.borderRadius};
    border-bottom-right-radius: ${shape.corners.borderRadius};
  }
  &::after {
    pointer-events: none;
    z-index: 100;
    content: '';
    position: absolute;
    left: calc(${spacings.small} * -1);
    width: calc(100% + (${spacings.small} * 2));
    height: 5px;
    background-color: ${colors.interactive.primary__resting.rgba};
    border-radius: ${shape.corners.borderRadius};
    opacity: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${spacings.x_small};
  padding: ${spacings.medium} 0;
  scroll-margin-top: ${HEADER_HEIGHT}px;
  > div {
    display: flex;
    align-items: center;
    gap: ${spacings.x_small};
    color: ${colors.text.static_icons__tertiary.rgba};
  }
`;

export const TopRight = styled.section`
  display: flex;
  gap: ${spacings.medium};
  align-items: center;
`;

export const ExpandWrapper = styled(motion.div)`
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  > button {
    margin-left: auto;
    margin-bottom: ${spacings.medium};
  }
  overflow: hidden;
  > div {
    padding-bottom: ${spacings.medium};
  }
`;
