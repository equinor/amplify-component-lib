import {
  FC,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { log_out } from '@equinor/eds-icons';

import { TopBarMenu } from '../TopBarMenu';
import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { useCanImpersonate } from './ImpersonateMenu/hooks/useCanImpersonate';
import { useMappedRoles } from './ImpersonateMenu/hooks/useMappedRoles';
import { useStopImpersonation } from './ImpersonateMenu/hooks/useStopImpersonation';
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
import { ActiveUserImpersonationButton } from './ActiveUserImpersonationButton';
import { ImpersonateButton } from './ImpersonateButton';
import { EnvironmentType } from 'src/atoms';
import { environment } from 'src/atoms/utils/auth_environment';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

export interface AccountProps {
  renderCustomButton?: (
    buttonRef: RefObject<HTMLButtonElement | null>,
    handleToggle: () => void
  ) => ReactElement;
  hideRoleChips?: boolean;
  useDisplayNameForRole?: boolean;
  children?: ReactNode;
}

export const Account: FC<AccountProps> = ({
  renderCustomButton,
  hideRoleChips = false,
  useDisplayNameForRole = false,
  children,
}) => {
  const ACTIVE_ENVIRONMENT = environment.getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );
  const API_CLIENT_ID = environment.getApiClientId(
    import.meta.env.VITE_API_CLIENT_ID
  );
  const APPLICATION_NAME = environment.getAppName(import.meta.env.VITE_NAME);
  const { account, roles, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openImpersonate, setOpenImpersonate] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data: canImpersonate = true } = useCanImpersonate();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();
  const { mutate: endImpersonation } = useStopImpersonation();
  const activeRoles = useMappedRoles(
    activeImpersonationUser ? activeImpersonationUser.roles : (roles ?? []),
    useDisplayNameForRole
  );

  const fullName = activeImpersonationUser
    ? impersonateUserDtoToFullName(activeImpersonationUser)
    : account?.name;
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

  useEffect(() => {
    if (
      activeImpersonationUser &&
      activeImpersonationUser.appName != undefined &&
      activeImpersonationUser.appName.toUpperCase() !=
        APPLICATION_NAME.toUpperCase()
    ) {
      endImpersonation();
    }
  }, [activeImpersonationUser, APPLICATION_NAME, endImpersonation]);

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
            <Typography variant="h6">{fullName}</Typography>
            <Typography>{username}</Typography>
          </TextContent>
          {activeRoles && !hideRoleChips && (
            <RolesContainer>
              {activeRoles.map((role) => (
                <RoleChip key={role.value}>{role.label}</RoleChip>
              ))}
            </RolesContainer>
          )}
          {children}
          {canImpersonate &&
            ACTIVE_ENVIRONMENT !== EnvironmentType.PRODUCTION &&
            API_CLIENT_ID && (
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
