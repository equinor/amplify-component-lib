import React from 'react';
import { tokens } from '@equinor/eds-tokens';
import {
  Button,
  ButtonProps,
  Icon,
  Tooltip as EDSTooltip,
  Typography,
} from '@equinor/eds-core-react';
import styled from 'styled-components';
import { IconData } from '@equinor/eds-icons';

const { colors, spacings } = tokens;

interface ContainerProps extends ButtonProps {
  active?: boolean;
  open?: boolean;
}

const Container = styled(Button)<ContainerProps>`
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

  &:hover {
    cursor: pointer;
    background: ${colors.interactive.primary__selected_hover.hsla};
  }

  &:disabled {
    background: ${colors.interactive.disabled__fill.hsla};
    color: ${colors.interactive.disabled__text.hsla};
  }
`;

const ItemIcon = styled(Icon)`
  grid-column: 2;
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
  icon?: IconData;
  name: string;
  link?: string;
  onClick?: () => void;
};

interface MenuItemProps extends MenuItemType {
  open: boolean;
  currentUrl?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  open,
  currentUrl,
  icon,
  name,
  link,
  onClick,
}) => {
  const isCurrentUrl = () => currentUrl?.includes(link!);

  const getIconColor = () => {
    return isCurrentUrl()
      ? colors.interactive.primary__resting.hsla
      : colors.text.static_icons__default.hsla;
  };

  if (open) {
    return (
      <Container
        data-testid="menu-item-button"
        as="a"
        active={isCurrentUrl()}
        onClick={onClick}
        variant="ghost"
        open={open}
      >
        {icon && <ItemIcon data={icon} color={getIconColor()} />}
        <ItemText variant="cell_text" group="table" active={isCurrentUrl()}>
          {name}
        </ItemText>
      </Container>
    );
  }

  return (
    <Tooltip title={name} placement="right">
      <Container
        data-testid="menu-item-button"
        as="a"
        active={isCurrentUrl()}
        onClick={onClick}
        variant="ghost"
        open={open}
      >
        {icon && <ItemIcon data={icon} color={getIconColor()} />}
      </Container>
    </Tooltip>
  );
};

export default MenuItem;
