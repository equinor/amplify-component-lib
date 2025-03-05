import { FC, useMemo, useRef, useState } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';

import { colors, spacings } from 'src/atoms/style';
import { SideBarMenuItemWithItems } from 'src/atoms/types/SideBar';
import { OptionalTooltip } from 'src/molecules';
import {
  IconContainer,
  ItemText,
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
  background: ${({ $expanded }) =>
    $expanded ? colors.ui.background__light.rgba : 'transparent'};
  text-decoration: none;
  transition: background 0.1s ease-out;

  &:hover {
    text-decoration: none;
    background: ${({ $expanded }) =>
      $expanded
        ? colors.interactive.primary__selected_hover.rgba
        : colors.interactive.primary__hover_alt.rgba};
  }

  ${({ $open }) =>
    !$open &&
    css`
      &:after {
        position: absolute;
        right: -7px; // 1px border offset from 8px width
        bottom: -1px;
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

export type CollapsableMenuItemProps = {
  currentUrl?: string;
} & SideBarMenuItemWithItems;

export const CollapsableMenuItem: FC<CollapsableMenuItemProps> = ({
  icon,
  name,
  items,
  currentUrl,
  ...rest
}) => {
  const { isOpen } = useSideBar();
  const isActive = items.some((item) =>
    isCurrentUrl({ currentUrl, link: item.link })
  );
  const parentRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleOnToggleExpanded = () => setExpanded((prev) => !prev);

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
          <p key={index}>{item.name}</p>
        ))}
      </>
    );
  }

  if (expanded) {
    return (
      <>
        {parentContent}
        <Menu open anchorEl={parentRef.current} placement="right-start">
          <Menu.Item>hei</Menu.Item>
        </Menu>
      </>
    );
  }

  return parentContent;
};
