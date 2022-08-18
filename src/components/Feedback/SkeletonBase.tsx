import styled, { keyframes } from 'styled-components';
const loading = keyframes`
  0% {
    background-position: -25%;
  }
  50% {
    background-position: -50%;
  }
  100% {
    background-position: -150%;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #cacaca, #dcdcdc, #cacaca);
  background-size: 600% 600%;
  animation-name: ${loading};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

export default SkeletonBase;
