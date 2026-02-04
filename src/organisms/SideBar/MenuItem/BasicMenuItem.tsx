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
} from 'src/organisms/SideBar/MenuItem/MenuItem.utils';
import { useSideBar } from 'src/providers/SideBarProvider';

export type BasicMenuItemProps = {
  disabled?: boolean;
} & BasicSideBarMenuItem;

export const BasicMenuItem: FC<BasicMenuItemProps> = ({
  icon,
  onClick,
  replace = false,
  name,
  disabled = false,
  featureUuid,
  ...linkProps
}) => {
  const { pathname } = useLocation();
  const isActive = isCurrentUrl({
    currentUrl: pathname,
    link: linkProps.to,
  });
  const { isOpen } = useSideBar();
  const shouldNavigate = canNavigate({
    currentUrl: pathname,
    link: linkProps.to,
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
            $active={isActive}
            aria-disabled={disabled}
            $disabled={disabled}
            onClick={handleOnClick}
            tabIndex={0}
            data-testid="sidebar-menu-item"
            {...linkProps}
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
  }, [disabled, handleOnClick, icon, isActive, isOpen, name, linkProps]);

  if (featureUuid) {
    return <Feature featureUuid={featureUuid}>{content}</Feature>;
  }

  return content;
};
