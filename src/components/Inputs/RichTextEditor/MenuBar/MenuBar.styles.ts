import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
const { colors, spacings, shape } = tokens;

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
  padding: ${spacings.comfortable.x_small};
  background: ${({ $active }) =>
    $active
      ? colors.interactive.primary__resting.rgba
      : colors.ui.background__light.rgba};
  display: flex;
  align-items: center;
  border-radius: ${shape.button.borderRadius};
  transition: 200ms background;
  > svg {
    fill: ${({ $customColors, $active }) => {
      if ($customColors) return $customColors.resting;

      if ($active) {
        return colors.ui.background__light.rgba;
      }
      return colors.interactive.primary__resting.rgba;
    }};
    transition: 200ms fill;
  }

  &:hover:not(:disabled) {
    background: ${({ $customColors }) =>
      $customColors
        ? $customColors.backgroundHover
        : colors.interactive.primary__hover_alt.rgba};

    > svg {
      fill: ${({ $customColors }) => {
        if ($customColors) return $customColors.hover;
        return colors.interactive.primary__hover.rgba;
      }};
    }
  }

  &:hover:disabled {
    cursor: not-allowed;
  }

  &:disabled > svg {
    fill: ${colors.interactive.disabled__text.rgba};
  }
`;
