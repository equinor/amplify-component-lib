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
import { log_out } from '@equinor/eds-icons';

import {
  ButtonWrapper,
  Container,
  ProfileButton,
  RoleChip,
  RolesContainer,
  TextContent,
} from './Account.styles';
import ProfileAvatar from 'src/components/DataDisplay/ProfileAvatar';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';

export interface AccountProps {
  account: AccountInfo | undefined;
  logout: () => void;
  photo: string | undefined;
  roles: string[] | undefined;
  renderCustomButton?: (
    buttonRef: MutableRefObject<HTMLButtonElement | null>,
    handleToggle: () => void
  ) => ReactElement;
}

export const Account: FC<AccountProps> = ({
  account,
  logout,
  photo,
  roles,
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
        <ProfileButton ref={buttonRef} onClick={toggleMenu}>
          <ProfileAvatar size={36} name={account?.name} url={photo} />
        </ProfileButton>
      )}
      <TopBarMenu
        open={isOpen}
        title="Account"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        <Container>
          <ProfileAvatar size={64} name={account?.name} url={photo} />
          <TextContent>
            <Typography variant="h6">{account?.name}</Typography>
            <Typography>{account?.username}</Typography>
          </TextContent>
          {roles && (
            <RolesContainer>
              {roles.map((role) => (
                <RoleChip key={role}>{role}</RoleChip>
              ))}
            </RolesContainer>
          )}
        </Container>
        <ButtonWrapper>
          <Button variant="ghost" onClick={logout}>
            <Icon data={log_out} />
            Log out
          </Button>
        </ButtonWrapper>
      </TopBarMenu>
    </>
  );
};

Account.displayName = 'TopBar.Account';
