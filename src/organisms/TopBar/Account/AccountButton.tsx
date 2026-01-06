import { forwardRef } from 'react';

import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { ProfileButton } from './Account.styles';
import { spacings } from 'src/atoms/style';
import {
  formatFeatureName,
  getVariantColors,
} from 'src/atoms/utils/environmentToggle';
import { SelectOptionRequired } from 'src/molecules';
import { Chip } from 'src/molecules/Chip/Chip';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { StatusVariantProps } from 'src/organisms/TopBar/Account/Account.types';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
`;

export const StatusChip = styled(Chip)<StatusVariantProps>`
  background: ${({ $variant }) => getVariantColors($variant).chipBackground};
  outline: none;
  padding: 0;
`;

interface AccountButtonProps {
  onClick: () => void;
  environmentToggle: SelectOptionRequired[];
}

export const AccountButton = forwardRef<HTMLButtonElement, AccountButtonProps>(
  ({ onClick, environmentToggle }, ref) => {
    const { account, photo } = useAuth();
    const { data: activeImpersonationUser } = useActiveImpersonationUser();
    const isActiveFeatureOnCurrentEnvironment = environmentToggle.length > 0;
    const activeFeatures = environmentToggle.map((item) =>
      formatFeatureName(item.value as EnvironmentToggleFeatures)
    );

    const impersonationRoles = activeImpersonationUser?.roles?.sort() ?? [];

    const getAvatar = () => {
      if (isActiveFeatureOnCurrentEnvironment && activeImpersonationUser) {
        return <StatusAvatar size={36} variant={'combined'} />;
      }
      if (isActiveFeatureOnCurrentEnvironment) {
        return (
          <StatusAvatar
            size={36}
            name={environmentToggle.map((x) => x.value).join(', ')}
            variant="environment"
          />
        );
      }

      if (activeImpersonationUser) {
        return <StatusAvatar size={36} variant="impersonate" />;
      }

      return <ProfileAvatar size={36} name={account?.name} url={photo} />;
    };

    return (
      <Wrapper>
        {impersonationRoles.at(0) && (
          <StatusChip $variant={'impersonate'}>
            {impersonationRoles[0]}
          </StatusChip>
        )}
        {impersonationRoles.length > 1 && (
          <StatusChip
            $variant={'impersonate'}
          >{`+${impersonationRoles.length - 1}`}</StatusChip>
        )}

        {isActiveFeatureOnCurrentEnvironment && activeFeatures.at(0) && (
          <StatusChip $variant={'environment'}>{activeFeatures[0]}</StatusChip>
        )}
        {activeFeatures.length > 1 && (
          <StatusChip
            $variant={'environment'}
          >{`+${activeFeatures.length - 1}`}</StatusChip>
        )}
        <ProfileButton ref={ref} onClick={onClick}>
          {getAvatar()}
        </ProfileButton>
      </Wrapper>
    );
  }
);

AccountButton.displayName = 'AccountButton';
