import { forwardRef } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { ProfileButton } from './Account.styles';
import { colors, spacings } from 'src/atoms/style';
import { SelectOptionRequired } from 'src/molecules';
import { Chip } from 'src/molecules/Chip/Chip';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
`;

const StatusChip = styled(Chip)`
  background: ${colors.interactive.warning__resting.rgba};
  outline: none;
  padding: 0;
`;

interface AccountButtonProps {
  onClick: () => void;
  environmentToggle?: SelectOptionRequired[];
}

export const AccountButton = forwardRef<HTMLButtonElement, AccountButtonProps>(
  ({ onClick, environmentToggle }, ref) => {
    const { account, photo } = useAuth();
    const { data: activeImpersonationUser } = useActiveImpersonationUser();
    const isActiveFeatureOnCurrentEnvironment =
      environmentToggle != null && environmentToggle.length > 0;
    const activeFeatures =
      environmentToggle == null
        ? []
        : environmentToggle.map((item) => item.value);

    const impersonationRoles = activeImpersonationUser?.roles?.sort() ?? [];

    return (
      <Wrapper>
        {impersonationRoles.at(0) && (
          <StatusChip>{impersonationRoles[0]}</StatusChip>
        )}
        {impersonationRoles.length > 1 && (
          <StatusChip>{`+${impersonationRoles.length - 1}`}</StatusChip>
        )}

        {isActiveFeatureOnCurrentEnvironment && activeFeatures.at(0) && (
          <StatusChip>{activeFeatures[0].split('-key')[0]}</StatusChip>
        )}
        {activeFeatures && activeFeatures.length > 1 && (
          <StatusChip>{`+${activeFeatures.length - 1}`}</StatusChip>
        )}
        <ProfileButton ref={ref} onClick={onClick}>
          {isActiveFeatureOnCurrentEnvironment ? (
            <StatusAvatar size={36} />
          ) : activeImpersonationUser ? (
            <StatusAvatar size={36} />
          ) : (
            <ProfileAvatar size={36} name={account?.name} url={photo} />
          )}
        </ProfileButton>
      </Wrapper>
    );
  }
);

AccountButton.displayName = 'AccountButton';
