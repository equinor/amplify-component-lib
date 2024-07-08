import { forwardRef } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import OptionalTooltip from '../../../DataDisplay/OptionalTooltip';
import { MenuButtonStyle } from './MenuBar.styles';

interface MenuButtonProps {
  ref?: React.RefObject<HTMLButtonElement>;
  children?: React.ReactNode;
  icon: IconData;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  customColors?: {
    resting: string;
    hover: string;
    backgroundHover: string;
  };
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      icon,
      onClick,
      customColors,
      active = false,
      disabled = false,
      tooltip,
      children,
      ...props
    },
    ref
  ) => (
    <OptionalTooltip title={tooltip} placement="bottom">
      <MenuButtonStyle
        ref={ref}
        $active={active}
        $customColors={customColors}
        onClick={onClick}
        disabled={disabled}
        type="button"
        {...props}
      >
        <Icon data={icon} />
        {children}
      </MenuButtonStyle>
    </OptionalTooltip>
  )
);

MenuButton.displayName = 'MenuButton';

export type { MenuButtonProps };
export default MenuButton;
