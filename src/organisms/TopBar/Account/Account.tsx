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

import { TopBarMenu } from '../TopBarMenu';
import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { useCanImpersonate } from './ImpersonateMenu/hooks/useCanImpersonate';
import { ImpersonateMenu } from './ImpersonateMenu/ImpersonateMenu';
import {
  ButtonWrapper,
  Container,
  RoleChip,
  RolesContainer,
  TextContent,
} from './Account.styles';
import { AccountAvatar } from './AccountAvatar';
import { AccountButton } from './AccountButton';
import { ImpersonateButton } from './ImpersonateButton';
import { ActiveUserImpersonationButton } from 'src/organisms/TopBar/Account/ActiveUserImpersonationButton';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

interface AccountProps {
  /**
   * @deprecated logout - Not needed anymore
   */
  logout?: () => void;
  /**
   * @deprecated account - Not needed anymore
   */
  account?: AccountInfo | undefined;
  /**
   * @deprecated photo - Not needed anymore
   */
  photo?: string | undefined;
  /**
   * @deprecated roles - Not needed anymore
   */
  roles?: string[] | undefined;
  renderCustomButton?: (
    buttonRef: MutableRefObject<HTMLButtonElement | null>,
    handleToggle: () => void
  ) => ReactElement;
}

export const Account: FC<AccountProps> = ({ renderCustomButton }) => {
  const { account, roles, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openImpersonate, setOpenImpersonate] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data: canImpersonate } = useCanImpersonate();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  const name = activeImpersonationUser
    ? activeImpersonationUser.name
    : account?.name;
  const activeRoles = activeImpersonationUser
    ? activeImpersonationUser.roles
    : roles;
  const username = activeImpersonationUser
    ? activeImpersonationUser.uniqueName
    : account?.username;

  const handleMenuOnClose = () => setIsOpen(false);
  const handleToggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    setOpenImpersonate(false);
  }, []);

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
        <AccountButton ref={buttonRef} onClick={handleToggleMenu} />
      )}
      <TopBarMenu
        open={isOpen}
        title="Account"
        onClose={handleMenuOnClose}
        anchorEl={buttonRef.current}
      >
        <Container>
          {activeImpersonationUser && (
            <ActiveUserImpersonationButton onClick={handleOpenImpersonate} />
          )}
          <AccountAvatar />
          <TextContent>
            <Typography variant="h6">{name}</Typography>
            <Typography>{username}</Typography>
          </TextContent>
          {activeRoles && (
            <RolesContainer>
              {activeRoles.map((role) => (
                <RoleChip key={role}>{role}</RoleChip>
              ))}
            </RolesContainer>
          )}
          {canImpersonate && (
            <ImpersonateButton
              onOpenImpersonateMenu={handleOpenImpersonate}
              onClose={handleMenuOnClose}
            />
          )}
        </Container>
        <ButtonWrapper>
          <Button variant="ghost" onClick={logout}>
            <Icon data={log_out} />
            Log out
          </Button>
        </ButtonWrapper>
      </TopBarMenu>
      <ImpersonateMenu
        open={openImpersonate}
        onClose={handleOnCloseImpersonate}
        anchorEl={buttonRef.current}
      />
    </>
  );
};

Account.displayName = 'TopBar.Account';
