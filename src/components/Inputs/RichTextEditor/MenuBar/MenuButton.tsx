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

const MenuButton: React.FC<MenuButtonProps> = ({
  ref,
  icon,
  onClick,
  children,
  customColors,
  active = false,
  disabled = false,
  tooltip,
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
