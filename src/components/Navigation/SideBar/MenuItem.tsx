import React, { forwardRef } from 'react';

import {
  Icon,
  Tooltip as EDSTooltip,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useSideBar } from '../../../providers/SideBarProvider';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface ContainerProps {
  active?: boolean;
  open?: boolean;
  disabled?: boolean;
}

const Container = styled.a<ContainerProps>`
  background: ${(props) =>
    props.active
      ? colors.interactive.primary__selected_highlight.hsla
      : 'none'};
  display: ${(props) => (props.open ? 'grid' : 'flex')};
  grid-template-columns: repeat(10, 1fr);
  grid-gap: ${spacings.comfortable.medium};
  justify-content: ${(props) => !props.open && 'center'};
  align-items: center;
  border-bottom: 1px solid ${colors.ui.background__medium.hsla};
  text-decoration: none;
  min-height: 72px;

  ${(props) =>
    props.disabled
      ? `
    &:hover {
      cursor: not-allowed;
    }
  `
      : `
    &:hover {
      cursor: pointer;
      background: ${colors.interactive.primary__selected_hover.hsla};
    }
  `}

  &:disabled {
    background: ${colors.interactive.disabled__fill.hsla};
    color: ${colors.interactive.disabled__text.hsla};
  }
`;

const ItemIcon = styled(Icon)`
  grid-column: 2;
  margin-left: -4px;
`;

interface ItemTextProps {
  active?: boolean;
}

const ItemText = styled(Typography)<ItemTextProps>`
  font-weight: ${(props) => (props.active ? '500' : '400')};
  grid-column: 3 / -1;
  color: ${colors.text.static_icons__default.hex};
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
  disabled?: boolean;
};

export type MenuItemProps = {
  currentUrl?: string;
} & MenuItemType &
  React.HTMLAttributes<HTMLAnchorElement>;

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ currentUrl, icon, name, link, onClick, disabled }, ref) => {
    const isCurrentUrl = link ? currentUrl?.includes(link) : false;
    const { isOpen } = useSideBar();

    const getIconColor = () => {
      if (!disabled) {
        return isCurrentUrl
          ? colors.interactive.primary__resting.hsla
          : colors.text.static_icons__default.hsla;
      }
      return colors.interactive.disabled__text.hex;
    };

    const handleOnClick = () => {
      if (!disabled) onClick();
    };

    if (isOpen) {
      return (
        <Container
          active={isCurrentUrl}
          onClick={handleOnClick}
          open
          ref={ref}
          data-testid="sidebar-menu-item"
          disabled={disabled}
        >
          {icon && <ItemIcon data={icon} size={24} color={getIconColor()} />}
          <ItemText variant="cell_text" group="table" active={isCurrentUrl}>
            {name}
          </ItemText>
        </Container>
      );
    }

    return (
      <Tooltip title={name} placement="right">
        <Container
          active={isCurrentUrl}
          onClick={handleOnClick}
          open={isOpen}
          ref={ref}
          data-testid="sidebar-menu-item"
          disabled={disabled}
        >
          {icon && <ItemIcon data={icon} size={24} color={getIconColor()} />}
        </Container>
      </Tooltip>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
