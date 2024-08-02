import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { account_circle, check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Container, RoleChip } from './UserImpersonation.styles';

const { colors } = tokens;

interface UserImpersonationProps {
  name: string;
  roles: string[];
  selected?: boolean;
  onClick: (username: string) => void;
}

export const UserImpersonation: FC<UserImpersonationProps> = ({
  name,
  roles,
  selected = false,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(name);
  };

  return (
    <Container $selected={selected} onClick={handleOnClick}>
      <Icon
        color={colors.text.static_icons__tertiary.rgba}
        data={account_circle}
      />
      <Typography>{name}</Typography>
      {roles.map((role) => (
        <RoleChip key={role}>{role}</RoleChip>
      ))}
      {selected && (
        <Icon data={check} color={colors.interactive.primary__resting.rgba} />
      )}
    </Container>
  );
};
