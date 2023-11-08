import { FC } from 'react';

import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { SidebarTheme } from './SideBar.types';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

interface ContainerProps {
  $theme: SidebarTheme;
  $open?: boolean;
}

const ToggleContainer = styled.div<ContainerProps>`
  display: ${({ $open }) => ($open ? 'grid' : 'flex')};
  grid-template-columns: repeat(10, 1fr);
  grid-gap: ${spacings.comfortable.medium};
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${spacings.comfortable.medium};
  ${({ $open }) =>
    !$open &&
    `
    > button {
      margin-left: -4px;
    }
  `}
  > button:hover {
    background: ${({ $theme }) =>
      $theme === SidebarTheme.light
        ? colors.interactive.secondary__highlight.hex
        : '#324D62'};
  }
`;

const LargeButton = styled.button`
  grid-column: 2 / 10;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: ${spacings.comfortable.medium};
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.button.borderRadius};
  height: 40px;
  margin-left: -${spacings.comfortable.medium};
  margin-right: -${spacings.comfortable.medium};
  > p {
    grid-column: 2;
    margin-left: -1px; // border size
  }
  cursor: pointer;
  &:hover {
    background: ${colors.interactive.secondary__highlight.hex};
  }
`;

const Text = styled(Typography)`
  font-weight: 400;
`;

interface ToggleOpenProps {
  theme: SidebarTheme;
  isOpen: boolean;
  toggle: () => void;
}

const ToggleOpen: FC<ToggleOpenProps> = ({ theme, isOpen, toggle }) => {
  const textColor =
    theme === SidebarTheme.light
      ? colors.text.static_icons__default.hex
      : colors.text.static_icons__primary_white.hex;

  if (isOpen) {
    return (
      <ToggleContainer $theme={theme} $open={isOpen}>
        <LargeButton onClick={toggle}>
          <Icon size={24} data={first_page} color={textColor} />
          <Text variant="cell_text" group="table" color={textColor}>
            Collapse
          </Text>
        </LargeButton>
      </ToggleContainer>
    );
  }
  return (
    <ToggleContainer $theme={theme} $open={isOpen}>
      <Tooltip title="Expand" placement="right">
        <Button onClick={toggle} color="secondary" variant="ghost_icon">
          <Icon size={24} data={last_page} color={textColor} />
        </Button>
      </Tooltip>
    </ToggleContainer>
  );
};

export default ToggleOpen;
