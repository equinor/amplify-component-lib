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

import { Icon, Typography } from '@equinor/eds-core-react';
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
  EnvironmentToggleWrapper,
  TextContent,
} from './Account.styles';
import { AccountAvatar } from './AccountAvatar';
import { AccountButton } from './AccountButton';
import { ActiveUserImpersonationButton } from './ActiveUserImpersonationButton';
import { ImpersonateButton } from './ImpersonateButton';
import { RoleList } from './RoleList';
import { useLocalStorage } from 'src/atoms';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { Field } from 'src/atoms/types/Field';
import { environment } from 'src/atoms/utils/auth_environment';
import { SelectOptionRequired } from 'src/molecules';
import { Button } from 'src/molecules/Button/Button';
import { EnvironmentToggle } from 'src/organisms/TopBar/Account/EnvironmentToggle';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';
import { StatusChips } from 'src/organisms/TopBar/Account/StatusChips';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

export interface AccountProps {
  renderCustomButton?: (
    buttonRef: RefObject<HTMLButtonElement | null>,
    handleToggle: () => void
  ) => ReactElement;
  hideRoles?: boolean;
  useDisplayNameForRole?: boolean;
  children?: ReactNode;
  availableFields?: Field[];
  availableWells?: string[];
  enableEnvironmentToggle?: boolean;
}

export const Account: FC<AccountProps> = ({
  renderCustomButton,
  hideRoles = false,
  useDisplayNameForRole = false,
  children,
  availableFields,
  availableWells,
  enableEnvironmentToggle,
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
  const [environmentToggle, setEnvironmentToggle] = useLocalStorage<
    SelectOptionRequired[]
  >('env-toggle-key', []);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data: canImpersonate = true } = useCanImpersonate();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();
  const { mutate: endImpersonation } = useStopImpersonation();
  const activeRoles = useMappedRoles(
    // Wasn't able to test the (roles ?? []) part, because roles are always defined from useAuth when we are logged in
    /* v8 ignore next */
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
        <AccountButton
          ref={buttonRef}
          onClick={handleToggleMenu}
          environmentToggle={environmentToggle}
        />
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
          <AccountAvatar environmentToggle={environmentToggle} />
          <TextContent>
            <Typography variant="h6">{fullName}</Typography>
            <Typography>{username}</Typography>
          </TextContent>

          {environmentToggle.length > 0 && (
            <StatusChips roles={environmentToggle} />
          )}
          {activeRoles && !hideRoles && (
            <>
              {activeRoles.length <= 3 ? (
                <StatusChips roles={activeRoles} />
              ) : (
                <RoleList roles={activeRoles} />
              )}
            </>
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
        <EnvironmentToggleWrapper>
          {enableEnvironmentToggle &&
            ACTIVE_ENVIRONMENT !== EnvironmentType.PRODUCTION && (
              <EnvironmentToggle
                setEnvironmentToggle={setEnvironmentToggle}
                environmentToggle={environmentToggle}
              />
            )}
        </EnvironmentToggleWrapper>
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
        availableFields={availableFields}
        availableWells={availableWells}
      />
    </>
  );
};

Account.displayName = 'TopBar.Account';
