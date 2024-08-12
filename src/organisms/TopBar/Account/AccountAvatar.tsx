import { FC } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { colors, spacings, useAuth } from 'src/atoms';
import { Chip, ProfileAvatar } from 'src/molecules';
import { ImpersonateAvatar } from 'src/organisms/TopBar/Account/ImpersonateAvatar';

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

export const AccountAvatar: FC = () => {
  const { account, photo } = useAuth();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  if (activeImpersonationUser) {
    return (
      <Wrapper>
        <ImpersonateAvatar size={64} />
        <ImpersonateChip>Impersonating</ImpersonateChip>
      </Wrapper>
    );
  }

  return <ProfileAvatar size={64} name={account?.name} url={photo} />;
};
