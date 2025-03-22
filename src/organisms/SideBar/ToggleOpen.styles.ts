import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

interface ContainerProps {
  $isOpen: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  height: 64px;
  padding: ${spacings.medium};
  gap: ${spacings.medium};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  transition: background 0.1s ease-out;
  cursor: pointer;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;
