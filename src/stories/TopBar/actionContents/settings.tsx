import React, { useState } from 'react';
import { Button, Menu, Typography, Radio, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { clear, settings } from '@equinor/eds-icons';
import { Box } from '@material-ui/core';
import { tokens } from '@equinor/eds-tokens';
const { colors, elevation } = tokens;

const StyledMenu = styled(Menu)`
  width: 320px;
  padding: 16px;
`;

interface StyledColorBoxProps {
  color: string;
}

const StyledColorBox = styled.div<StyledColorBoxProps>`
  width: 64px;
  height: 32px;
  background-color: ${(props) => props.color};
  box-shadow: ${elevation.raised};
  border-radius: 4px;
`;

const Settings: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const isOpen = Boolean(anchorEl);

  const openMenu = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement;
    setAnchorEl(target);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onChange = () => null;

  return (
    <>
      <Button
        variant="ghost_icon"
        onClick={(e) => (isOpen ? closeMenu() : openMenu(e))}
      >
        <Icon
          data={settings}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <StyledMenu
        id="menu-on-button"
        aria-labelledby="menuButton"
        open={isOpen}
        anchorEl={anchorEl!}
        onClose={closeMenu}
        placement="bottom-start"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" as="span">
            Settings
          </Typography>
          <Button variant="ghost_icon" onClick={closeMenu}>
            <Icon data={clear} />
          </Button>
        </Box>
        <Typography variant="overline">Theme</Typography>
        <Box paddingRight="40px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Radio
              label="Light Mode"
              name="group"
              value="light"
              checked={true}
              onChange={onChange}
            />
            <StyledColorBox color={colors.ui.background__default.hsla} />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Radio
              disabled
              label="Dark Mode"
              name="group"
              value="dark"
              checked={false}
              onChange={onChange}
            />
            <StyledColorBox color={colors.ui.background__overlay.hsla} />
          </Box>
        </Box>
      </StyledMenu>
    </>
  );
};

export default Settings;
