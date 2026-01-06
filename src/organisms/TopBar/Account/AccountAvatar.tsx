import { FC } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { spacings } from 'src/atoms/style';
import { getVariantColors } from 'src/atoms/utils/environmentToggle';
import { ProfileAvatar, SelectOptionRequired } from 'src/molecules';
import { Chip } from 'src/molecules/Chip/Chip';
import { StatusVariantProps } from 'src/organisms/TopBar/Account/Account.types';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${spacings.small};
`;

const StatusChip = styled(Chip)<StatusVariantProps>`
  position: absolute;
  bottom: calc(${spacings.x_small} * -1);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: ${({ $variant }) => getVariantColors($variant).chipBackground};
  outline-color: ${({ $variant }) => getVariantColors($variant).outline};
`;

interface AccountAvatarProps {
  environmentToggle: SelectOptionRequired[];
}

export const AccountAvatar: FC<AccountAvatarProps> = ({
  environmentToggle,
}) => {
  const { account, photo } = useAuth();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();
  const fullName = activeImpersonationUser
    ? impersonateUserDtoToFullName(activeImpersonationUser)
    : account?.name;

  const isActiveFeatureOnCurrentEnvironment = environmentToggle.length > 0;
  const activeFeatureNames = environmentToggle.map((x) => x.label).join(', ');

  const getAvatar = () => {
    if (isActiveFeatureOnCurrentEnvironment && activeImpersonationUser) {
      return (
        <>
          <StatusAvatar
            size={64}
            variant="combined"
            name="Impersonate & Environment"
          />
          <StatusChip $variant="combined">Impersonate & Environment</StatusChip>
        </>
      );
    }
    if (isActiveFeatureOnCurrentEnvironment) {
      return (
        <>
          <StatusAvatar
            size={64}
            variant="environment"
            name={activeFeatureNames}
          />
          <StatusChip $variant="environment">Environment</StatusChip>
        </>
      );
    }

    if (activeImpersonationUser) {
      return (
        <>
          <StatusAvatar size={64} variant="impersonate" name={fullName} />
          <StatusChip $variant="impersonate">Impersonating</StatusChip>
        </>
      );
    }

    return <ProfileAvatar size={64} name={account?.name} url={photo} />;
  };

  return <Wrapper>{getAvatar()}</Wrapper>;
};
