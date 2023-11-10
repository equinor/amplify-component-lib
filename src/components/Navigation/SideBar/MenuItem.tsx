import { forwardRef, HTMLAttributes, useMemo } from 'react';

import {
  Icon,
  Tooltip as EDSTooltip,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  activeColor,
  borderBottomColor,
  hoverColor,
  textColor,
} from './MenuItem.utils';
import { SidebarTheme } from './SideBar.types';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface ContainerProps {
  $theme: SidebarTheme;
  $active?: boolean;
  $open?: boolean;
}

const Container = styled.a<ContainerProps>`
  background: ${({ $active, $theme }) =>
    $active ? activeColor($theme) : 'none'};
  display: ${({ $open }) => ($open ? 'grid' : 'flex')};
  grid-template-columns: repeat(10, 1fr);
  grid-gap: ${spacings.comfortable.medium};
  justify-content: ${({ $open }) => !$open && 'center'};
  align-items: center;
  border-bottom: 1px solid ${({ $theme }) => borderBottomColor($theme)};
  box-sizing: border-box;
  text-decoration: none;
  height: 72px;

  ${({ $theme, $active }) =>
    !$active &&
    `
    &:hover {
      cursor: pointer;
      background: ${hoverColor($theme)};
    }
  `}
`;

const ItemIcon = styled(Icon)`
  grid-column: 2;
  margin-left: -4px;
`;

interface ItemTextProps {
  $theme: SidebarTheme;
  $active?: boolean;
}

const ItemText = styled(Typography)<ItemTextProps>`
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  grid-column: 3 / -1;
  color: ${({ $theme }) => textColor($theme)};
  &::first-letter {
    text-transform: capitalize;
  }
`;

const Tooltip = styled(EDSTooltip)`
  text-transform: capitalize;
`;

export type MenuItemType = {
  icon: IconData;
  name: string;
  link: string;
  onClick: () => void;
};

export type MenuItemProps = {
  theme?: keyof typeof SidebarTheme;
  currentUrl?: string;
} & MenuItemType &
  HTMLAttributes<HTMLAnchorElement>;

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  (
    { theme = SidebarTheme.light, currentUrl, icon, name, link, onClick },
    ref
  ) => {
    const isCurrentUrl = currentUrl?.includes(link) ?? false;
    const { isOpen } = useSideBar();

    const iconColor = useMemo(() => {
      if (theme === SidebarTheme.light) {
        return isCurrentUrl
          ? colors.interactive.primary__resting.hex
          : colors.text.static_icons__default.hex;
      }
      return textColor(SidebarTheme[theme]);
    }, [isCurrentUrl, theme]);

    const handleOnClick = () => {
      if (!isCurrentUrl) {
        onClick();
      }
    };

    if (isOpen) {
      return (
        <Container
          $theme={SidebarTheme[theme]}
          $active={isCurrentUrl}
          onClick={handleOnClick}
          $open
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && <ItemIcon data={icon} size={24} color={iconColor} />}
          <ItemText
            $theme={SidebarTheme[theme]}
            variant="cell_text"
            group="table"
            $active={isCurrentUrl}
          >
            {name}
          </ItemText>
        </Container>
      );
    }

    return (
      <Tooltip title={name} placement="right">
        <Container
          $theme={SidebarTheme[theme]}
          $active={isCurrentUrl}
          onClick={handleOnClick}
          $open={isOpen}
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && <ItemIcon data={icon} size={24} color={iconColor} />}
        </Container>
      </Tooltip>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
