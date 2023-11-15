import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { shape, colors } = tokens;

interface ChipProps {
  $active: boolean;
}

const StyledChip = styled(Button)<ChipProps>`
  border-radius: ${shape.rounded.borderRadius};
  &:hover {
    border-radius: ${shape.rounded.borderRadius};
  }
  background-color: ${({ $active }) =>
    $active
      ? colors.ui.background__light.hex
      : colors.ui.background__default.hex};
  color: black;
  padding: 4px 10px;

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

export { Dot, StyledChip };
