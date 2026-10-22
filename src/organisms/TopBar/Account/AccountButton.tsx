import { forwardRef } from 'react';

import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { ProfileButton } from './Account.styles';
import { spacings } from 'src/atoms/style';
import { formatFeatureName } from 'src/atoms/utils/environmentToggle';
import { SelectOptionRequired } from 'src/molecules';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { Tag } from 'src/molecules/Tag/Tag';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
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
          <Tag color="grey">{impersonationRoles[0]}</Tag>
        )}
        {impersonationRoles.length > 1 && (
          <Tag color="grey">{`+${impersonationRoles.length - 1}`}</Tag>
        )}

        {isActiveFeatureOnCurrentEnvironment && activeFeatures.at(0) && (
          <Tag color="grey">{activeFeatures[0]}</Tag>
        )}
        {activeFeatures.length > 1 && (
          <Tag color="grey">{`+${activeFeatures.length - 1}`}</Tag>
        )}
        <ProfileButton ref={ref} onClick={onClick}>
          {getAvatar()}
        </ProfileButton>
      </Wrapper>
    );
  }
);

AccountButton.displayName = 'AccountButton';
