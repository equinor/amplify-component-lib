import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled, { css, keyframes } from 'styled-components';

const { colors } = tokens;

interface StyledOptionProps {
  $section: number;
  $animationActive?: boolean;
}

const animateToggle = keyframes`
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
  }
`;

const StyledOptionWrapper = styled.div<StyledOptionProps>`
  margin-left: ${({ $section }) => ($section > 0 ? '22px' : '')};
  border-left: ${({ $section }) =>
    $section > 0 ? '1px solid ' + colors.ui.background__medium.rgba : ''};
  opacity: 1;
  color: ${colors.text.static_icons__default.rgba};
  animation: ${({ $animationActive }) =>
    $animationActive
      ? css`
          ${animateToggle} 400ms ease-in
        `
      : 'none'};
`;

const StyledOption = styled.div<StyledOptionProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
  }

  svg {
    fill: ${colors.interactive.primary__resting.rgba};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export { StyledOptionWrapper, StyledOption, StyledIcon };
