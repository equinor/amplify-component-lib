import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, shape, colors } = tokens;

const StyledChipButton = styled(Button)`
  border-radius: ${shape.rounded.borderRadius};
  background-color: ${colors.ui.background__default.hex};
  color: black;
  padding: 4px 10px;

  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

const StyledChip = styled.div`
  display: flex;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};
  border-radius: ${shape.rounded.borderRadius};
  &:hover {
    border-radius: ${shape.rounded.borderRadius};
  }
  background-color: ${colors.ui.background__light.hex};
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

export { Dot, StyledChip, StyledChipButton };
