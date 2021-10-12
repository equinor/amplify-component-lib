import React, { useState } from 'react';
import {
  Button,
  Menu,
  Typography,
  Icon,
  Avatar,
} from '@equinor/eds-core-react';
import styled from 'styled-components';
import { clear, account_circle } from '@equinor/eds-icons';
import { Box } from '@material-ui/core';
import { tokens } from '@equinor/eds-tokens';
import { useAuth } from '../../../Auth';
const { colors } = tokens;

const StyledMenu = styled(Menu)`
  width: 320px;
  padding: 16px;
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 50%;
  margin-right: 16px;
`;

const FullWidthWrapper = styled.div`
  display: grid;
  margin-top: 25px;
  justify-content: stretch;
  flex-direction: column;
  grid-gap: 16px;
`;

const Account: React.FC = () => {
  const { account, logout, photo } = useAuth();
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

  return (
    <>
      <Button
        variant="ghost_icon"
        onClick={(e) => (isOpen ? closeMenu() : openMenu(e))}
      >
        <Icon
          data={account_circle}
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
            Account
          </Typography>
          <Button variant="ghost_icon" onClick={closeMenu}>
            <Icon data={clear} />
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledAvatar alt="user image" size={40} src={photo} />
          <div>
            <Typography variant="h6">{account?.name}</Typography>
            <Typography>{account?.userName}</Typography>
          </div>
        </Box>
        <FullWidthWrapper>
          <Button onClick={logout}>Log out</Button>
        </FullWidthWrapper>
      </StyledMenu>
    </>
  );
};

export default Account;
