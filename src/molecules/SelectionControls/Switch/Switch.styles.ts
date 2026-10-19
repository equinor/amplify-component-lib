import { Icon } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';

import styled, { keyframes } from 'styled-components';

const spawn = keyframes`
 from {
   opacity: 0;
 }
  to {
    opacity: 1;
  }
`;

interface SwitchIconProps {
  $checked: boolean;
  $disabled?: boolean;
}

/* Overlays the pill opposite the knob; clicks fall through to the input */
export const SwitchIcon = styled(Icon)<SwitchIconProps>`
  position: absolute;
  top: 12px;
  left: ${({ $checked }) => ($checked ? '18px' : '30px')};
  pointer-events: none;
  opacity: 0;
  animation: ${spawn} 200ms forwards;
  animation-delay: 200ms;
  fill: ${({ $checked, $disabled }) => {
    if ($disabled) return colors.interactive.disabled__text.rgba;
    if ($checked) return colors.text.static_icons__primary_white.rgba;
    return colors.text.static_icons__default.rgba;
  }};
`;
