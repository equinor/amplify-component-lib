import styled, { keyframes } from 'styled-components';
export const skeletonBaseloading = keyframes`
  to {
    transform: translateX(100%);
  }
`;

interface SkeletonBaseProps {
  $offset?: number;
}

const SkeletonBase = styled.div<SkeletonBaseProps>`
  background: #cacaca;
  overflow: hidden;
  position: relative;
  z-index: 2;
  &:after {
    background: linear-gradient(90deg, #cacaca 0%, #dcdcdc 50%, #cacaca 100%);
    animation: ${skeletonBaseloading} 1.5s infinite;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    ${(props) =>
      props.$offset &&
      `
    animation-delay: ${props.$offset}ms;
  `};
  }
`;

export default SkeletonBase;
