import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import OptionalTooltip from '../../../DataDisplay/OptionalTooltip';
import { MenuButtonStyle } from './MenuBar.styles';

interface MenuButtonProps {
  children?: React.ReactNode;
  icon: IconData;
  onClick: () => void;
  customColors?: {
    resting: string;
    hover: string;
    backgroundHover: string;
  };
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  ref?: React.RefObject<HTMLButtonElement>;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  icon,
  onClick,
  customColors,
  active = false,
  disabled = false,
  tooltip,
  ref,
}) => (
  <OptionalTooltip title={tooltip} placement="bottom">
    <MenuButtonStyle
      ref={ref}
      $active={active}
      type="button"
      $customColors={customColors}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon data={icon} />
      {children}
    </MenuButtonStyle>
  </OptionalTooltip>
);

export default MenuButton;
