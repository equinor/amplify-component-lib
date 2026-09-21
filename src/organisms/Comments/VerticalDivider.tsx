import { colors } from 'src/atoms/style';

import styled from 'styled-components';

export const VerticalDivider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-0.5px);
    width: 1px;
    background: ${colors.ui.background__medium.rgba};
  }
`;
