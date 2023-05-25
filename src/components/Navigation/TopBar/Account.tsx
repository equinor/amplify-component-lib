import { FC, useRef, useState } from 'react';

import { AccountInfo } from '@azure/msal-common';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { account_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ProfileAvatar from '../../DataDisplay/ProfileAvatar';
import TopBarMenu from './TopBarMenu';

import styled from 'styled-components';

const { spacings, colors } = tokens;

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

export const Account: FC<IAccountProps> = ({ account, logout, photo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Button variant="ghost_icon" onClick={toggleMenu} ref={buttonRef}>
        <Icon
          data={account_circle}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <TopBarMenu
        open={isOpen}
        title="Account"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
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
      </TopBarMenu>
    </>
  );
};

Account.displayName = 'TopBar.Account';
