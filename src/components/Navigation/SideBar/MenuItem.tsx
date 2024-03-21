import { forwardRef, HTMLAttributes, useMemo } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { IconContainer, ItemText, Link } from './MenuItem.styles';
import OptionalTooltip from 'src/components/DataDisplay/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';

export interface MenuItemType {
  icon: IconData;
  name: string;
  link: string;
  onClick?: () => void;
}

export type MenuItemProps = {
  currentUrl?: string;
  disabled?: boolean;
} & MenuItemType &
  HTMLAttributes<HTMLAnchorElement>;

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ currentUrl, icon, name, link, onClick, disabled = false }, ref) => {
    const isCurrentUrl = currentUrl?.includes(link) ?? false;
    const { isOpen } = useSideBar();

    const canNavigate = useMemo(
      () => !disabled && !isCurrentUrl,
      [disabled, isCurrentUrl]
    );

    const handleOnClick = (event: React.MouseEvent) => {
      if (!canNavigate) {
        event.preventDefault();
        return;
      }
      if (onClick) onClick();
    };

    if (isOpen) {
      return (
        <Link
          to={link}
          $active={isCurrentUrl}
          aria-disabled={disabled}
          $disabled={disabled}
          onClick={handleOnClick}
          tabIndex={0}
          $open
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && (
            <IconContainer data-testid="icon-container">
              <Icon data={icon} size={24} />
            </IconContainer>
          )}
          <ItemText
            $active={isCurrentUrl}
            $disabled={disabled}
            variant="button"
            group="navigation"
          >
            {name}
          </ItemText>
        </Link>
      );
    }

    return (
      <Link
        to={link}
        $active={isCurrentUrl}
        aria-disabled={disabled}
        $disabled={disabled}
        onClick={handleOnClick}
        $open={isOpen}
        tabIndex={0}
        ref={ref}
        data-testid="sidebar-menu-item"
      >
        <OptionalTooltip title={name} placement="right">
          {icon && (
            <IconContainer data-testid="icon-container">
              <Icon data={icon} size={24} />
            </IconContainer>
          )}
        </OptionalTooltip>
      </Link>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
