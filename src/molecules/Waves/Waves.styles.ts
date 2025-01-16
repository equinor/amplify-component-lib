import styled from 'styled-components';

export const Container = styled.div`
  --topGradientColor: #77d9dd;
  --bottomGradientColor: #407577;
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  position: relative;
  background: linear-gradient(
    180deg,
    var(--bottomGradientColor) 0%,
    var(--topGradientColor) 100%
  );
  > svg {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
  }
`;
