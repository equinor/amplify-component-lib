import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  position: relative;
  > svg {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
  }
`;
