import { FC } from 'react';

import { colors } from 'src/atoms/style';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';

import styled from 'styled-components';

interface WrapperProps {
  $variant?: 'impersonate' | 'environment' | 'combined';
}

const Wrapper = styled.div<WrapperProps>`
  width: fit-content;
  border: 2px solid
    ${({ $variant }) => {
      switch ($variant) {
        case 'combined':
          return colors.interactive.danger__resting.rgba;
        case 'environment':
          return colors.interactive.warning__resting.rgba;
        case 'impersonate':
          return colors.interactive.primary__resting.rgba;
        default:
          return colors.interactive.warning__resting.rgba;
      }
    }};
  border-radius: 50%;
  > div:first-child {
    background: ${colors.interactive.warning__text.rgba};
  }
`;

interface StatusAvatarProps {
  size: number;
  name?: string;
}

export const StatusAvatar: FC<StatusAvatarProps> = ({ size, name }) => {
  return (
    <Wrapper>
      <ProfileAvatar size={size} name={name ?? 'Environment'} />
    </Wrapper>
  );
};
