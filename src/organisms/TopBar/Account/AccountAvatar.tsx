import { FC } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { colors, spacings } from 'src/atoms/style';
import { SelectOptionRequired } from 'src/molecules';
import { Chip } from 'src/molecules/Chip/Chip';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${spacings.small};
`;

const ImpersonateChip = styled(Chip)`
  position: absolute;
  bottom: calc(${spacings.x_small} * -1);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.interactive.warning__resting.rgba};
  outline-color: ${colors.interactive.warning__resting.rgba};
`;

const EnvironmentChip = styled(Chip)`
  position: absolute;
  bottom: calc(${spacings.x_small} * -1);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.interactive.warning__resting.rgba};
  outline-color: ${colors.interactive.warning__resting.rgba};
`;

interface AccountAvatarProps {
  environmentToggle?: SelectOptionRequired[];
}

export const AccountAvatar: FC<AccountAvatarProps> = ({
  environmentToggle,
}) => {
  const { account, photo } = useAuth();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  const isActiveFeatureOnCurrentEnvironment =
    environmentToggle != null && environmentToggle.length > 0;
  const activeFeatureNames =
    environmentToggle == null
      ? ''
      : environmentToggle.map((x) => x.label).join(', ');

  if (activeImpersonationUser) {
    return (
      <Wrapper>
        <StatusAvatar size={64} />
        <ImpersonateChip>Impersonating</ImpersonateChip>
      </Wrapper>
    );
  }

  if (isActiveFeatureOnCurrentEnvironment) {
    return (
      <Wrapper>
        <StatusAvatar size={64} name={activeFeatureNames} />
        <EnvironmentChip>Environment</EnvironmentChip>
      </Wrapper>
    );
  }

  return <ProfileAvatar size={64} name={account?.name} url={photo} />;
};
