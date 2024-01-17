import { forwardRef } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

interface ButtonProps {
  $active: boolean;
  $customSvgFill?: string;
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
    fill: ${({ $customSvgFill, $active }) => {
      if ($customSvgFill) return $customSvgFill;

      if ($active) {
        return colors.ui.background__light.rgba;
      }
      return colors.interactive.primary__resting.rgba;
    }};
    transition: 200ms fill;
  }
  &:hover:not(:disabled) {
    background: ${colors.interactive.primary__resting.rgba};

    > svg {
      fill: ${({ $customSvgFill }) => {
        if ($customSvgFill) return $customSvgFill;
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
  customIconColor?: string;
  active?: boolean;
  disabled?: boolean;
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    { icon, onClick, customIconColor, active = false, disabled = false },
    ref
  ) => (
    <Button
      ref={ref}
      $active={active}
      $customSvgFill={customIconColor}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon data={icon} />
    </Button>
  )
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
