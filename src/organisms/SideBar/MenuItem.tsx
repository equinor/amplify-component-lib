import { forwardRef, HTMLAttributes, MouseEvent, useMemo } from 'react';

import { Icon } from '@equinor/eds-core-react';

import { IconContainer, ItemText, Link } from './MenuItem.styles';
import { isCurrentUrl as checkUrl } from './MenuItem.utils';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';

export type MenuItemProps = {
  currentUrl?: string;
  disabled?: boolean;
  /**
   * This is useful for routes that drills into a path,
   * by still highlighting the original path and not disable "back to start" by click on the same link again
   * eg. navigating to /collections and clicking on an item to go into /collections/:id and so on
   */
  hasPathDrilling?: boolean;
} & SideBarMenuItem &
  HTMLAttributes<HTMLAnchorElement>;

export const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  (
    {
      currentUrl,
      icon,
      name,
      link,
      onClick,
      disabled = false,
      replace = false,
      hasPathDrilling = false,
    },
    ref
  ) => {
    const isCurrentUrl = checkUrl({
      currentUrl,
      link,
      replace,
      hasPathDrilling,
    });
    const { isOpen } = useSideBar();

    const canNavigate = useMemo(
      () => !disabled && !isCurrentUrl,
      [disabled, isCurrentUrl]
    );

    const handleOnClick = (event: MouseEvent) => {
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
          replace={replace}
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
