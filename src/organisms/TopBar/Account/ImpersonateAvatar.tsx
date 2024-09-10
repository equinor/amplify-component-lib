import { FC } from 'react';

import { colors } from 'src/atoms';
import { ProfileAvatar } from 'src/molecules';
import { useActiveImpersonationUser } from 'src/organisms/TopBar/Account/ImpersonateMenu/hooks/useActiveImpersonationUser';

import styled from 'styled-components';

const Wrapper = styled.div`
  border: 2px solid ${colors.interactive.warning__resting.rgba};
  border-radius: 50%;
  > div:first-child {
    background: ${colors.interactive.warning__text.rgba};
  }
`;

interface ImpersonateAvatarProps {
  size: number;
}

export const ImpersonateAvatar: FC<ImpersonateAvatarProps> = ({ size }) => {
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  return (
    <Wrapper>
      <ProfileAvatar size={size} name={activeImpersonationUser?.fullName} />
    </Wrapper>
  );
};
