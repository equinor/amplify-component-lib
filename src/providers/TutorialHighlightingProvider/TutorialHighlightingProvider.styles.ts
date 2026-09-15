import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const CustomScrimSvg = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999999;
  background: none;
  pointer-events: none;
`;

export const Centered = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  z-index: 99999999;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: none;
  pointer-events: none;
`;
