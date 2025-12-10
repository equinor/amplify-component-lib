import { FC } from 'react';

import { colors } from 'src/atoms/style';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';

import styled from 'styled-components';

export type StatusVariant = 'impersonate' | 'environment' | 'combined';
export interface StatusVariantProps {
  $variant?: StatusVariant;
}

const Wrapper = styled.div<StatusVariantProps>`
  width: fit-content;
  border: 2px solid
    ${({ $variant }) => {
      switch ($variant) {
        case 'combined':
          return colors.interactive.success__resting.rgba;
        case 'environment':
          return colors.interactive.success__resting.rgba;
        case 'impersonate':
          return colors.interactive.warning__resting.rgba;
        default:
          return colors.interactive.warning__resting.rgba;
      }
    }};
  border-radius: 50%;
  > div:first-child {
    background: ${({ $variant }) => {
      switch ($variant) {
        case 'combined':
          return colors.interactive.warning__text.rgba;
        case 'environment':
          return colors.interactive.success__text.rgba;
        case 'impersonate':
          return colors.interactive.warning__text.rgba;
        default:
          return colors.interactive.warning__text.rgba;
      }
    }};
  }
`;

interface StatusAvatarProps {
  size: number;
  name?: string;
  variant?: StatusVariant;
}

export const StatusAvatar: FC<StatusAvatarProps> = ({
  size,
  name,
  variant,
}) => {
  return (
    <Wrapper $variant={variant}>
      <ProfileAvatar size={size} name={name ?? 'Environment'} />
    </Wrapper>
  );
};
