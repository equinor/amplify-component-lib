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
  SwitchWrapper,
  TextContent,
} from './Account.styles';
import { AccountAvatar } from './AccountAvatar';
import { AccountButton } from './AccountButton';
import { ActiveUserImpersonationButton } from './ActiveUserImpersonationButton';
import { ImpersonateButton } from './ImpersonateButton';
import { RoleChips } from './RoleChips';
import { RoleList } from './RoleList';
import {
  EnvironmentType,
  PointToProdFeaturesLocalStorageKey,
} from 'src/atoms/enums/Environment';
import { Field } from 'src/atoms/types/Field';
import { environment } from 'src/atoms/utils/auth_environment';
import { Switch } from 'src/molecules';
import { Button } from 'src/molecules/Button/Button';
import { useEnvironmentToggle } from 'src/organisms/TopBar/Account/environmentToggles/hooks/useEnvironmentToggle';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';
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
}

export const Account: FC<AccountProps> = ({
  renderCustomButton,
  hideRoles = false,
  useDisplayNameForRole = false,
  children,
  availableFields,
  availableWells,
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
  const {
    featureStates,
    toggleFeature,
    hasUnsavedChanges,
    resetChanges,
    applyChanges,
  } = useEnvironmentToggle();

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

  const handleToggleFeature = (
    featureKey: PointToProdFeaturesLocalStorageKey,
    checked: boolean
  ) => {
    toggleFeature(featureKey, checked);
  };

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
          {activeRoles && !hideRoles && (
            <>
              {activeRoles.length <= 3 ? (
                <RoleChips roles={activeRoles} />
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
        {ACTIVE_ENVIRONMENT !== EnvironmentType.PRODUCTION && (
          <SwitchWrapper>
            <TextContent>
              <Typography variant="h6">Environment</Typography>
              <Typography></Typography>
            </TextContent>
            <>
              <Typography variant="caption" style={{ marginBottom: '8px' }}>
                Select environment to use for SAM API calls (Default is
                production)
              </Typography>
              {Object.values(PointToProdFeaturesLocalStorageKey).map(
                (feature) => {
                  const featureName = feature.split('-key')[0];
                  return (
                    <Switch
                      key={feature}
                      label={`Use current environment for ${featureName}`}
                      checked={featureStates[feature] ?? false}
                      onChange={(e) =>
                        handleToggleFeature(feature, e.target.checked)
                      }
                    />
                  );
                }
              )}
            </>
          </SwitchWrapper>
        )}
        {hasUnsavedChanges && (
          <ButtonWrapper>
            <Button variant="outlined" onClick={resetChanges}>
              Cancel
            </Button>
            <Button onClick={applyChanges}>Apply Changes</Button>
          </ButtonWrapper>
        )}
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
