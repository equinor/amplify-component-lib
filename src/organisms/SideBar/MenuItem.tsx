import {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useMemo,
} from 'react';

import { Icon } from '@equinor/eds-core-react';
import { Feature } from '@equinor/subsurface-app-management';

import {
  IconContainer,
  ItemText,
  Link,
  MenuItemWrapper,
} from './MenuItem.styles';
import { isCurrentUrl } from './MenuItem.utils';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';

export type MenuItemProps = {
  currentUrl?: string;
  disabled?: boolean;
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
      featureUuid,
      ...props
    },
    ref
  ) => {
    const isActive = isCurrentUrl({
      currentUrl,
      link,
    });
    const isExactUrl = useMemo(() => {
      const currentWithoutParams = currentUrl?.split('?')[0];
      return currentWithoutParams === link;
    }, [currentUrl, link]);
    const { isOpen } = useSideBar();

    const canNavigate = useMemo(
      () => !disabled && (!isActive || (isActive && !isExactUrl && replace)),
      [disabled, isActive, isExactUrl, replace]
    );

    const handleOnClick = useCallback(
      (event: MouseEvent) => {
        if (!canNavigate) {
          event.preventDefault();
          return;
        }
        if (onClick) onClick();
      },
      [canNavigate, onClick]
    );

    const content = useMemo(() => {
      if (isOpen) {
        return (
          <OptionalTooltip title={name} placement="right">
            <MenuItemWrapper>
              <Link
                to={link}
                $active={isActive}
                aria-disabled={disabled}
                $disabled={disabled}
                onClick={handleOnClick}
                tabIndex={0}
                $open
                ref={ref}
                data-testid="sidebar-menu-item"
                replace={replace}
                {...props}
              >
                <IconContainer data-testid="icon-container">
                  <Icon data={icon} size={24} />
                </IconContainer>
                <ItemText
                  $active={isActive}
                  $disabled={disabled}
                  variant="button"
                  group="navigation"
                >
                  {name}
                </ItemText>
              </Link>
            </MenuItemWrapper>
          </OptionalTooltip>
        );
      }

      return (
        <OptionalTooltip title={name} placement="right">
          <MenuItemWrapper>
            <Link
              to={link}
              $active={isActive}
              aria-disabled={disabled}
              $disabled={disabled}
              onClick={handleOnClick}
              $open={isOpen}
              tabIndex={0}
              ref={ref}
              {...props}
              data-testid="sidebar-menu-item"
            >
              <IconContainer data-testid="icon-container">
                <Icon data={icon} size={24} />
              </IconContainer>
            </Link>
          </MenuItemWrapper>
        </OptionalTooltip>
      );
    }, [
      disabled,
      handleOnClick,
      icon,
      isActive,
      isOpen,
      link,
      name,
      props,
      ref,
      replace,
    ]);

    if (featureUuid) {
      return <Feature featureUuid={featureUuid}>{content}</Feature>;
    }

    return content;
  }
);

MenuItem.displayName = 'MenuItem';
