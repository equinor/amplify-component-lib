import React from 'react';
import { tokens } from '@equinor/eds-tokens';
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Typography,
  TypographyProps,
} from '@equinor/eds-core-react';
import styled from 'styled-components';
import { IconData } from '@equinor/eds-icons';

const { colors } = tokens;

interface IMenuItemButtonProps extends ButtonProps {
  active?: boolean;
  open?: boolean;
}

const MenuItemButton = styled(Button)<IMenuItemButtonProps>`
  background: ${(props: IMenuItemButtonProps) =>
    props.active
      ? colors.interactive.primary__selected_highlight.hsla
      : undefined};
  display: ${(props) => (props.open ? 'grid' : 'flex')};
  grid-template-columns: repeat(8, 1fr);
  justify-content: ${(props) => !props.open && 'center'};
  align-items: center;
  border-bottom: 2px solid ${colors.ui.background__medium.hsla};
  text-decoration: none;
  min-height: 72px;

  &:hover {
    background: ${colors.interactive.primary__selected_hover.hsla};
  }

  &:disabled {
    background: ${colors.interactive.disabled__fill.hsla};
    color: ${colors.interactive.disabled__text.hsla};
  }
`;

interface IMenuItemButtonIconProps extends IconProps {
  open?: boolean;
}

const MenuItemButtonIcon = styled(Icon)<IMenuItemButtonIconProps>`
  grid-column: ${(props) => props.open && '2 / 3'};
`;

type MenuItemButtonTypographyProps = TypographyProps & {
  open?: boolean;
};

const MenuItemButtonTypography = styled(
  Typography
)<MenuItemButtonTypographyProps>`
  grid-column: ${(props) => props.open && '4 / -1'};
`;

export type MenuItemDto = {
  icon?: IconData;
  name: string;
  link?: string;
  onClick?: () => void;
};

interface IProps {
  data: MenuItemDto;
  open?: boolean;
  currentUrl: string;
}

const MenuItem: React.FC<IProps> = ({ data, open, currentUrl }) => {
  const isCurrentUrl = () => currentUrl.includes(data.link!);

  const getIconColor = () => {
    return isCurrentUrl()
      ? colors.interactive.primary__resting.hsla
      : colors.text.static_icons__secondary.hsla;
  };

  return (
    <MenuItemButton
      data-testid="menu-item-button"
      href={data.link}
      as={data.onClick ? 'button' : 'a'}
      active={isCurrentUrl()}
      onClick={data.onClick}
      variant="ghost"
      open={open}
    >
      {data.icon && (
        <MenuItemButtonIcon
          open={open}
          data={data.icon}
          color={getIconColor()}
        />
      )}
      {data.name && open && (
        <MenuItemButtonTypography
          open={open}
          group="navigation"
          variant="button"
        >
          {data.name}
        </MenuItemButtonTypography>
      )}
    </MenuItemButton>
  );
};

export default MenuItem;
