import { forwardRef } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

interface ButtonProps {
  $active: boolean;
  $customColors?: {
    resting: string;
    hover: string;
    backgroundHover: string;
  };
}

const Button = styled.button<ButtonProps>`
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
        : colors.interactive.primary__resting.rgba};

    > svg {
      fill: ${({ $customColors }) => {
        if ($customColors) return $customColors.hover;
        return colors.ui.background__light.rgba;
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

interface MenuButtonProps {
  icon: IconData;
  onClick: () => void;
  customColors?: {
    resting: string;
    hover: string;
    backgroundHover: string;
  };
  active?: boolean;
  disabled?: boolean;
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ icon, onClick, customColors, active = false, disabled = false }, ref) => (
    <Button
      ref={ref}
      $active={active}
      $customColors={customColors}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon data={icon} />
    </Button>
  )
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
