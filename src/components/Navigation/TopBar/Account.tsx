import { forwardRef, KeyboardEvent, MouseEvent, useState } from 'react';

import { AccountInfo } from '@azure/msal-common';
import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { account_circle, clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ProfileAvatar from '../../DataDisplay/ProfileAvatar';

import styled from 'styled-components';

const { spacings, colors } = tokens;
const StyledMenu = styled(Menu)`
  width: 320px;
  padding: ${spacings.comfortable.medium};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

export const Account = forwardRef<HTMLButtonElement, IAccountProps>(
  ({ account, logout, photo }, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);

    const handleOnClose = () => {
      setAnchorEl(null);
    };

    const handleButtonClick = (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
      if (!isOpen) {
        const target = e.target as HTMLButtonElement;
        setAnchorEl(target);
      } else {
        setAnchorEl(null);
      }
    };

    return (
      <>
        <Button variant="ghost_icon" onClick={handleButtonClick} ref={ref}>
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
            anchorEl={anchorEl}
            onClose={handleOnClose}
            placement="bottom-start"
          >
            <Header>
              <Typography variant="h6" as="span">
                Account
              </Typography>
              <Button
                variant="ghost_icon"
                onClick={handleOnClose}
                data-testid="close-button"
              >
                <Icon data={clear} />
              </Button>
            </Header>
            <Info>
              <ProfileAvatar size="large" name={account?.name} url={photo} />
              <div>
                <Typography variant="h6">{account?.name}</Typography>
                <Typography>{account?.username}</Typography>
              </div>
            </Info>
            <FullWidthWrapper>
              <Button onClick={logout}>Log out</Button>
            </FullWidthWrapper>
          </StyledMenu>
        )}
      </>
    );
  }
);

Account.displayName = 'TopBar.Account';
