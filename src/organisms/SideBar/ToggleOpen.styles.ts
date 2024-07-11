import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $open?: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: ${({ $open }) => !$open && 'center'};
  height: 64px;
  padding: ${spacings.medium};
  gap: ${spacings.medium};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  transition: background 0.1s ease-out;

  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
    cursor: pointer;
  }
  &:focus {
    outline: 1px dashed ${colors.interactive.primary__resting.rgba};
    outline-offset: -1px;
  }
`;
