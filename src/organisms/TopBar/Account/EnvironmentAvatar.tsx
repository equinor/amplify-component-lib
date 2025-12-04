import { FC } from 'react';

import { colors } from 'src/atoms/style';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { useToggleActiveEnvironment } from 'src/organisms/TopBar/Account/environmentToggles/hooks/useToggleActiveEnvironment';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: fit-content;
  border: 2px solid ${colors.interactive.warning__resting.rgba};
  border-radius: 50%;
  > div:first-child {
    background: ${colors.interactive.warning__text.rgba};
  }
`;

interface EnvironmentAvatarProps {
  size: number;
}

export const EnvironmentAvatar: FC<EnvironmentAvatarProps> = ({ size }) => {
  const { activeFeatures } = useToggleActiveEnvironment();

  return (
    <Wrapper>
      <ProfileAvatar
        size={size}
        name={
          activeFeatures && activeFeatures.length > 0
            ? activeFeatures.join(', ')
            : 'Environment'
        }
      />
    </Wrapper>
  );
};
