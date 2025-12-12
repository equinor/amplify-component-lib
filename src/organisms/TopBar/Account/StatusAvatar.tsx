import { FC } from 'react';

import { getVariantColors } from 'src/atoms/utils/environmentToggle';
import { ProfileAvatar } from 'src/molecules/ProfileAvatar/ProfileAvatar';
import {
  StatusVariant,
  StatusVariantProps,
} from 'src/organisms/TopBar/Account/Account.types';

import styled from 'styled-components';

const Wrapper = styled.div<StatusVariantProps>`
  width: fit-content;
  border: 2px solid ${({ $variant }) => getVariantColors($variant).border};
  border-radius: 50%;
  > div:first-child {
    background: ${({ $variant }) => getVariantColors($variant).background}
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
