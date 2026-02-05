import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { Link as TanstackLink, useLocation } from '@tanstack/react-router';

import { usePrevious } from 'src/atoms/hooks/usePrevious';
import { colors, spacings } from 'src/atoms/style';
import { SideBarMenuItemWithItems } from 'src/atoms/types/SideBar';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import {
  IconContainer,
  ItemText,
  Link,
  MenuItemWrapper,
} from 'src/organisms/SideBar/MenuItem/MenuItem.styles';
import { isCurrentUrl } from 'src/organisms/SideBar/MenuItem/MenuItem.utils';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled, { css } from 'styled-components';

interface ParentProps {
  $open: boolean;
  $active: boolean;
  $expanded: boolean;
}

const Parent = styled.button<ParentProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-self: stretch;
  align-items: center;
  height: 64px;
  min-width: 64px;
  padding: ${spacings.medium};
  gap: ${spacings.medium};
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  background: ${({ $active, $expanded }) => {
    if ($active) return colors.interactive.primary__selected_highlight.rgba;
    if ($expanded) return colors.interactive.table__header__fill_resting.rgba;
    return 'transparent';
  }};
  text-decoration: none;
  transition: background 0.1s ease-out;

  &:hover {
    text-decoration: none;
    background: ${({ $active, $expanded }) => {
      if ($active) return colors.interactive.primary__selected_hover.rgba;
      if ($expanded) return colors.ui.background__medium.rgba;
      return colors.interactive.primary__hover_alt.rgba;
    }};
    svg {
      fill: ${colors.interactive.primary__hover.rgba};
    }
  }

  ${({ $open }) =>
    !$open &&
    css`
      &:after {
        position: absolute;
        right: -7px; // 1px border offset from 8px width
        bottom: 0;
        height: 0;
        width: 0;
        border-color: transparent;
        border-bottom-color: ${colors.interactive.primary__resting.rgba};
        border-style: solid;
        border-width: 8px;
        content: '';
        z-index: 500;
      }
    `}
`;

const Child = styled(Link)`
  display: grid;
  grid-template-columns: 32px 1fr;
  height: unset;
  > p:first-child {
    grid-column: 2;
  }
`;

export type CollapsableMenuItemProps = SideBarMenuItemWithItems;

export const CollapsableMenuItem: FC<CollapsableMenuItemProps> = ({
  icon,
  name,
  items,
  ...rest
}) => {
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);
  const { isOpen } = useSideBar();
  const previousIsOpen = usePrevious(isOpen);
  const isActive = items.some((item) =>
    isCurrentUrl({ currentUrl: pathname, link: item.to })
  );
  const parentRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleOnToggleExpanded = () => setExpanded((prev) => !prev);

  useEffect(() => {
    if (
      (previousIsOpen && !isOpen && expanded) ||
      (previousPathname !== pathname && expanded && !isOpen)
    ) {
      setExpanded(false);
    }
  }, [expanded, isOpen, pathname, previousIsOpen, previousPathname]);

  const parentContent = useMemo(() => {
    return (
      <OptionalTooltip title={name} placement="right">
        <MenuItemWrapper>
          <Parent
            ref={parentRef}
            $open={isOpen}
            $active={isActive}
            $expanded={expanded}
            onClick={handleOnToggleExpanded}
            {...rest}
          >
            <IconContainer data-testid="icon-container">
              <Icon
                data={icon}
                size={24}
                color={colors.interactive.primary__resting.rgba}
              />
            </IconContainer>
            {isOpen && (
              <>
                <ItemText
                  $active={false}
                  $disabled={false}
                  variant="button"
                  group="navigation"
                >
                  {name}
                </ItemText>
                <Icon
                  data={expanded ? chevron_up : chevron_down}
                  size={24}
                  color={colors.interactive.primary__resting.rgba}
                />
              </>
            )}
          </Parent>
        </MenuItemWrapper>
      </OptionalTooltip>
    );
  }, [expanded, icon, isActive, isOpen, name, rest]);

  if (expanded && isOpen) {
    return (
      <>
        {parentContent}
        {items.map((item, index) => (
          <Child
            key={index}
            $active={isCurrentUrl({ currentUrl: pathname, link: item.to })}
            $disabled={item.disabled || false}
            {...item}
          >
            <ItemText
              $active={isActive}
              $disabled={item.disabled || false}
              variant="button"
              group="navigation"
            >
              {item.name}
            </ItemText>
          </Child>
        ))}
      </>
    );
  }

  if (expanded) {
    return (
      <>
        {parentContent}
        <Menu
          open
          anchorEl={parentRef.current}
          placement="right-start"
          onClose={handleOnToggleExpanded}
        >
          {items.map((item) => (
            <Menu.Item
              as={TanstackLink}
              key={item.to}
              active={isCurrentUrl({ currentUrl: pathname, link: item.to })}
              style={{ width: '256px' }}
              {...item}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </>
    );
  }

  return parentContent;
};
