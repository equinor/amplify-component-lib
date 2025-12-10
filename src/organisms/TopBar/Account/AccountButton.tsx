import { forwardRef } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { ProfileButton } from './Account.styles';
import { colors, spacings } from 'src/atoms/style';
import { cleanStatusText } from 'src/atoms/utils/envrionmentToggle';
import { SelectOptionRequired } from 'src/molecules';
import { Chip } from 'src/molecules/Chip/Chip';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import {
  StatusAvatar,
  StatusVariantProps,
} from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
`;

export const StatusChip = styled(Chip)<StatusVariantProps>`
  background:/* ${colors.interactive.warning__resting.rgba};*/ ${({
    $variant,
  }) => {
    switch ($variant) {
      case 'combined':
        return colors.interactive.warning__resting.rgba;
      case 'environment':
        return colors.interactive.success__resting.rgba;
      case 'impersonate':
        return colors.interactive.warning__resting.rgba;
      default:
        return colors.interactive.warning__resting.rgba;
    }
  }};
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
        : environmentToggle.map((item) => cleanStatusText(item.value));

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
          <StatusChip $variant={'environment'}>{activeFeatures}</StatusChip>
        )}
        {activeFeatures && activeFeatures.length > 1 && (
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
