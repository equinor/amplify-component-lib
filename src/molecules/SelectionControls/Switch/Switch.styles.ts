import { Icon } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';

import styled from 'styled-components';

interface SwitchIconProps {
  $checked: boolean;
  $disabled?: boolean;
}

/* Overlays the pill opposite the knob; clicks fall through to the input */
export const SwitchIcon = styled(Icon)<SwitchIconProps>`
  position: absolute;
  top: 10px;
  left: ${({ $checked }) => ($checked ? '18px' : '30px')};
  pointer-events: none;
  fill: ${({ $checked, $disabled }) => {
    if ($disabled) return colors.interactive.disabled__text.rgba;
    if ($checked) return colors.text.static_icons__primary_white.rgba;
    return colors.text.static_icons__default.rgba;
  }};
`;
