import { FC } from 'react';

import { colors } from 'src/atoms/style';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { useActiveImpersonationUser } from 'src/organisms/TopBar/Account/ImpersonateMenu/hooks/useActiveImpersonationUser';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: fit-content;
  border: 2px solid ${colors.interactive.warning__resting.rgba};
  border-radius: 50%;
  > div:first-child {
    background: ${colors.interactive.warning__text.rgba};
  }
`;

interface ImpersonateAvatarProps {
  size: number;
  fullName?: string;
}

export const ImpersonateAvatar: FC<ImpersonateAvatarProps> = ({
  size,
  fullName,
}) => {
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  return (
    <Wrapper>
      <ProfileAvatar
        size={size}
        name={fullName ? fullName : activeImpersonationUser?.firstName}
      />
    </Wrapper>
  );
};
