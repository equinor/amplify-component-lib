import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, shape, colors } = tokens;

const StyledChipButton = styled(Button)`
  border-radius: ${shape.rounded.borderRadius};
  color: ${colors.text.static_icons__default.rgba};
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  padding: 4px 10px;

  span > p {
    color: ${colors.text.static_icons__default.rgba};
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }

  &:hover {
    background: ${colors.ui.background__medium.rgba};
    border-radius: ${shape.rounded.borderRadius};
    color: ${colors.interactive.primary__hover.rgba};
  }
`;

const StyledChip = styled.div`
  display: flex;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};
  border-radius: ${shape.rounded.borderRadius};

  &:hover {
  }
  background-color: ${colors.ui.background__warning.rgba};
  color: ${colors.text.static_icons__default.rgba};
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
