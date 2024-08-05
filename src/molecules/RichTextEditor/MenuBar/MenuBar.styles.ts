import { tokens } from '@equinor/eds-tokens';

import { colors } from 'src/atoms/style';

import styled from 'styled-components';

const { spacings, shape } = tokens;

export const MenuSection = styled.section`
  display: flex;
  > button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  > button:first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  > button:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

interface MenuButtonProps {
  $active: boolean;
  $customColors?: {
    resting: string;
    hover: string;
    backgroundHover: string;
  };
}

export const MenuButtonStyle = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  border-radius: ${shape.button.borderRadius};
  padding: ${spacings.comfortable.x_small};
  color: ${(props) => getColor(props)};
  background: ${(props) => getBackground(props)};
  transition: 200ms;
  > svg {
    fill: ${(props) => getColor(props)};
    transition: 200ms fill;
  }

  &:hover:not(:disabled) {
    background: ${(props) => getHoverBackground(props)};
    color: ${(props) => getHoverColor(props)};
    > svg {
      fill: ${(props) => getHoverColor(props)};
    }
  }

  &:hover:disabled {
    cursor: not-allowed;
  }

  &:disabled > svg {
    fill: ${colors.interactive.disabled__text.rgba};
  }
`;

const getColor = (props: MenuButtonProps) => {
  if (props.$customColors) return props.$customColors.resting;
  if (props.$active) return colors.ui.background__light.rgba;
  return colors.interactive.primary__resting.rgba;
};

const getHoverColor = (props: MenuButtonProps) => {
  if (props.$customColors) return props.$customColors.hover;
  return colors.interactive.primary__hover.rgba;
};

const getBackground = (props: MenuButtonProps) => {
  return props.$active
    ? colors.interactive.primary__resting.rgba
    : colors.ui.background__light.rgba;
};

const getHoverBackground = (props: MenuButtonProps) => {
  return props.$customColors
    ? props.$customColors.backgroundHover
    : colors.interactive.primary__hover_alt.rgba;
};
