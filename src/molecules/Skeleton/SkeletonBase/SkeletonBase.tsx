import { COLORS } from 'src/molecules/Skeleton/Skeleton.styles';

import styled, { css, keyframes } from 'styled-components';

export const skeletonBaseloading = keyframes`
  to {
    transform: translateX(100%);
  }
`;

export interface SkeletonBaseProps {
  $offset?: number;
}

export const SkeletonBase = styled.div<SkeletonBaseProps>`
  background: ${COLORS.START};
  overflow: hidden;
  position: relative;
  z-index: 2;
  &:after {
    background: linear-gradient(
      90deg,
      ${COLORS.START} 0%,
      ${COLORS.END} 50%,
      ${COLORS.START} 100%
    );
    animation: ${skeletonBaseloading} 1.5s infinite;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    ${({ $offset }) => {
      if ($offset) {
        return css`
          animation-delay: ${$offset}ms;
        `;
      }
      return '';
    }}
`;
