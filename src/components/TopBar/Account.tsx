import {
  Avatar,
  Button,
  Icon,
  Menu,
  Typography,
} from '@equinor/eds-core-react';

import { account_circle, clear } from '@equinor/eds-icons';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { forwardRef, useState } from 'react';
import { AccountInfo } from '@azure/msal-common';

const { spacings, colors } = tokens;
const StyledMenu = styled(Menu)`
  width: 320px;
  padding: ${spacings.comfortable.medium};
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 50%;
  margin-right: ${spacings.comfortable.medium};
`;

const FullWidthWrapper = styled.div`
  display: grid;
  margin-top: ${spacings.comfortable.large};
  justify-content: stretch;
  flex-direction: column;
  grid-gap: ${spacings.comfortable.medium};
`;

export interface IAccountProps {
  account: AccountInfo | undefined;
  logout: () => void;
  photo: string | undefined;
}

export const Account = forwardRef<HTMLDivElement, IAccountProps>(
  ({ account, logout, photo }, ref) => {
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
        {isOpen && (
          <StyledMenu
            id="menu-on-button"
            aria-labelledby="menuButton"
            open={isOpen}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            anchorEl={anchorEl!}
            onClose={closeMenu}
            placement="bottom-start"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
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
                <Typography>{account?.username}</Typography>
              </div>
            </Box>
            <FullWidthWrapper>
              <Button onClick={logout}>Log out</Button>
            </FullWidthWrapper>
          </StyledMenu>
        )}
      </>
    );
  }
);

Account.displayName = 'Topbar.Account';
