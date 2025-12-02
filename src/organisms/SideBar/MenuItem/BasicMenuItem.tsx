import { FC, MouseEvent, useCallback, useMemo } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { Feature } from '@equinor/subsurface-app-management';
import { useLocation } from '@tanstack/react-router';

import { BasicSideBarMenuItem } from 'src/atoms/types/SideBar';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import {
  IconContainer,
  ItemText,
  Link,
  MenuItemWrapper,
} from 'src/organisms/SideBar/MenuItem/MenuItem.styles';
import {
  canNavigate,
  isCurrentUrl,
  isExactUrl,
} from 'src/organisms/SideBar/MenuItem/MenuItem.utils';
import { useSideBar } from 'src/providers/SideBarProvider';

export type BasicMenuItemProps = {
  disabled?: boolean;
} & BasicSideBarMenuItem;

export const BasicMenuItem: FC<BasicMenuItemProps> = ({
  icon,
  link,
  onClick,
  replace = false,
  name,
  disabled = false,
  featureUuid,
  exact,
  ...props
}) => {
  const { pathname } = useLocation();
  const isActive = exact
    ? isExactUrl({
        currentUrl: pathname,
        link,
      })
    : isCurrentUrl({
        currentUrl: pathname,
        link,
      });
  const { isOpen } = useSideBar();
  const shouldNavigate = canNavigate({
    currentUrl: pathname,
    link,
    replace,
    disabled,
  });

  const handleOnClick = useCallback(
    (event: MouseEvent) => {
      if (!shouldNavigate) {
        event.preventDefault();
        return;
      }
      if (onClick) onClick();
    },
    [shouldNavigate, onClick]
  );

  const content = useMemo(() => {
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
            data-testid="sidebar-menu-item"
            replace={replace}
            {...props}
          >
            <IconContainer data-testid="icon-container">
              <Icon data={icon} size={24} />
            </IconContainer>
            {isOpen && (
              <ItemText
                $active={isActive}
                $disabled={disabled}
                variant="button"
                group="navigation"
              >
                {name}
              </ItemText>
            )}
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
    replace,
  ]);

  if (featureUuid) {
    return <Feature featureUuid={featureUuid}>{content}</Feature>;
  }

  return content;
};
