import { forwardRef, HTMLAttributes, useMemo } from 'react';

import {
  Icon,
  Tooltip as EDSTooltip,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import OptionalTooltip from 'src/components/DataDisplay/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $active?: boolean;
  $open?: boolean;
  $disabled?: boolean;
}

const Container = styled.a<ContainerProps>`
  background: ${({ $active }) =>
    $active ? colors.interactive.primary__selected_highlight.rgba : 'none'};
  display: ${({ $open }) => ($open ? 'grid' : 'flex')};
  grid-template-columns: repeat(10, 1fr);
  grid-gap: ${spacings.medium};
  justify-content: ${({ $open }) => !$open && 'center'};
  align-items: center;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  box-sizing: border-box;
  text-decoration: none;
  height: 72px;
  transition: background 0.1s ease-in;

  ${({ $active, $disabled }) =>
    !$active &&
    !$disabled &&
    `
    &:hover {
      cursor: pointer;
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
  `}

  ${({ $active, $disabled }) =>
    $active &&
    !$disabled &&
    `
    &:hover {
      cursor: pointer;
      background: ${colors.interactive.primary__selected_hover.rgba};
    }
  `}
`;

const ItemIcon = styled(Icon)`
  grid-column: 2;
  margin-left: -4px;
`;

interface ItemTextProps {
  $active: boolean;
  $disabled: boolean;
}

const ItemText = styled(Typography)<ItemTextProps>`
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  grid-column: 3 / -1;
  color: ${({ $disabled }) =>
    $disabled
      ? colors.interactive.disabled__text.rgba
      : colors.text.static_icons__default.rgba};
  &::first-letter {
    text-transform: capitalize;
  }
`;


export type MenuItemType = {
  icon: IconData;
  name: string;
  link: string;
  onClick: () => void;
};

export type MenuItemProps = {
  currentUrl?: string;
  disabled?: boolean;
} & MenuItemType &
  HTMLAttributes<HTMLAnchorElement>;

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ currentUrl, icon, name, link, onClick, disabled = false }, ref) => {
    const isCurrentUrl = currentUrl?.includes(link) ?? false;
    const { isOpen } = useSideBar();

    const iconColor = useMemo(() => {
      if (disabled) {
        return colors.interactive.disabled__text.rgba;
      } else if (currentUrl) {
        return colors.interactive.primary__resting.rgba;
      } else {
        return colors.interactive.primary__resting.rgba;
      }
    }, [currentUrl, disabled]);

    const handleOnClick = () => {
      if (!isCurrentUrl && !disabled) {
        onClick();
      }
    };

    if (isOpen) {
      return (
        <Container
          $active={isCurrentUrl}
          $disabled={disabled}
          onClick={handleOnClick}
          $open
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && <ItemIcon data={icon} size={24} color={iconColor} />}
          <ItemText
            $active={isCurrentUrl}
            $disabled={disabled}
            variant="cell_text"
            group="table"
          >
            {name}
          </ItemText>
        </Container>
      );
    }

    return (
      <OptionalTooltip title={name + "asd"} placement="right" texttransform="capitalize">
        <Container
          $active={isCurrentUrl}
          $disabled={disabled}
          onClick={handleOnClick}
          $open={isOpen}
          ref={ref}
          data-testid="sidebar-menu-item"
        >
          {icon && <ItemIcon data={icon} size={24} color={iconColor} />}
        </Container>
      </OptionalTooltip>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
