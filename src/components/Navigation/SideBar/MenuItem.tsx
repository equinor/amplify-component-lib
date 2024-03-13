import { forwardRef, HTMLAttributes, useMemo, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { IconContainer, ItemText, Link } from './MenuItem.styles';
import OptionalTooltip from 'src/components/DataDisplay/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';

const { colors } = tokens;

export interface MenuItemType {
  icon: IconData;
  name: string;
  link: string;
  onClick: () => void;
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
    const [iconColor, setIconColor] = useState(
      disabled
        ? colors.interactive.disabled__text.rgba
        : colors.interactive.primary__resting.rgba
    );

    const canNavigate = useMemo(
      () => !disabled && !isCurrentUrl,
      [disabled, isCurrentUrl]
    );

    const handleOnMouseEnter = () => {
      if (!disabled && !isCurrentUrl) {
        setIconColor(colors.text.static_icons__default.rgba);
      }
    };

    const handleOnMouseLeave = () =>
      setIconColor(
        disabled
          ? colors.interactive.disabled__text.rgba
          : colors.interactive.primary__resting.rgba
      );

    const handleOnClick = () => {
      if (canNavigate) {
        onClick();
      }
    };

    if (isOpen) {
      return (
        <Link
          $active={isCurrentUrl}
          $disabled={disabled}
          onClick={handleOnClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          tabIndex={0}
          $open
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && (
            <IconContainer data-testid="icon-container">
              <Icon data={icon} size={24} color={iconColor} />
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
        $active={isCurrentUrl}
        $disabled={disabled}
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        $open={isOpen}
        tabIndex={0}
        href={canNavigate ? link : undefined}
        ref={ref}
        data-testid="sidebar-menu-item"
      >
        <OptionalTooltip title={name} placement="right">
          {icon && (
            <IconContainer data-testid="icon-container">
              <Icon data={icon} size={24} color={iconColor} />
            </IconContainer>
          )}
        </OptionalTooltip>
      </Link>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
