import { Icon as EDSIcon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, shape, colors } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface ChipProps {
  $active: boolean;
}

const StyledChip = styled.span<ChipProps>`
  font-family: 'Equionor', sans-serif;
  font-size: 12px;
  border-radius: ${shape.rounded.borderRadius};
  background-color: ${({ $active }) =>
    $active
      ? colors.ui.background__light.hex
      : colors.ui.background__default.hex};
  color: black;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};

  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

interface DotProps {
  $dotColor: string;
}

const Dot = styled.span<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $dotColor }) => $dotColor};
  position: relative;
`;

const Icon = styled(EDSIcon)`
  &:hover {
    cursor: pointer !important;
    background: ${colors.interactive.primary__hover_alt.hex};
    border-radius: ${shape.rounded.borderRadius};
  }
`;

export { ChipContainer, Container, Dot, Icon, StyledChip };
