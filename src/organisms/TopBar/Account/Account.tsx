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
import { arrow_forward, assignment_user, log_out } from '@equinor/eds-icons';

import { TopBarMenu } from '../TopBarMenu';
import {
  ButtonWrapper,
  Container,
  ImpersonateButton,
  ProfileButton,
  RoleChip,
  RolesContainer,
  TextContent,
} from './Account.styles';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { Impersonate } from 'src/organisms/TopBar/Account/Impersonate/Impersonate';

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
  const [openImpersonate, setOpenImpersonate] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isAdmin = roles?.includes('admin');

  const handleMenuOnClose = () => setIsOpen(false);
  const handleToggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleOpenImpersonate = () => {
    setOpenImpersonate(true);
    setIsOpen(false);
  };
  const handleOnCloseImpersonate = () => setOpenImpersonate(false);

  const customButton = useMemo(() => {
    if (renderCustomButton) {
      return renderCustomButton(buttonRef, handleToggleMenu);
    }
    return null;
  }, [renderCustomButton, handleToggleMenu]);

  return (
    <>
      {customButton ? (
        customButton
      ) : (
        <ProfileButton ref={buttonRef} onClick={handleToggleMenu}>
          <ProfileAvatar size={36} name={account?.name} url={photo} />
        </ProfileButton>
      )}
      <TopBarMenu
        open={isOpen}
        title="Account"
        onClose={handleMenuOnClose}
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
          <ImpersonateButton onClick={handleOpenImpersonate}>
            <Icon data={assignment_user} />
            <Typography variant="button" group="navigation" as="span">
              Impersonate
            </Typography>
            <Icon data={arrow_forward} />
          </ImpersonateButton>
        </Container>
        <ButtonWrapper>
          <Button variant="ghost" onClick={logout}>
            <Icon data={log_out} />
            Log out
          </Button>
        </ButtonWrapper>
      </TopBarMenu>
      <Impersonate
        open={openImpersonate}
        onClose={handleOnCloseImpersonate}
        anchorEl={buttonRef.current}
      />
    </>
  );
};

Account.displayName = 'TopBar.Account';
