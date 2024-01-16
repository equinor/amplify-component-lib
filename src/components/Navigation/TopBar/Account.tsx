import {
  FC,
  MutableRefObject,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AccountInfo } from '@azure/msal-common';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { account_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ProfileAvatar from '../../DataDisplay/ProfileAvatar';
import TopBarMenu from './TopBarMenu';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FullWidthWrapper = styled.div`
  display: grid;
  margin-top: ${spacings.large};
  justify-content: stretch;
  flex-direction: column;
  grid-gap: ${spacings.medium};
`;

export interface AccountProps {
  account: AccountInfo | undefined;
  logout: () => void;
  photo: string | undefined;
  renderCustomButton?: (
    buttonRef: MutableRefObject<HTMLButtonElement | null>,
    handleToggle: () => void
  ) => ReactElement;
}

export const Account: FC<AccountProps> = ({
  account,
  logout,
  photo,
  renderCustomButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const customButton = useMemo(() => {
    if (renderCustomButton) {
      return renderCustomButton(buttonRef, toggleMenu);
    }
    return null;
  }, [renderCustomButton, toggleMenu]);

  return (
    <>
      {customButton ? (
        customButton
      ) : (
        <Button variant="ghost_icon" onClick={toggleMenu} ref={buttonRef}>
          <Icon
            data={account_circle}
            size={24}
            color={colors.interactive.primary__resting.rgba}
          />
        </Button>
      )}
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
