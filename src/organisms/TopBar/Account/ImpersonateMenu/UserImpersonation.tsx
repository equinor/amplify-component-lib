import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { account_circle, check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ImpersonateUser } from '@equinor/subsurface-app-management';

import {
  Container,
  RoleChip,
  RoleChipContainer,
} from './UserImpersonation.styles';

const { colors } = tokens;

interface UserImpersonationProps extends ImpersonateUser {
  selected: boolean;
  onClick: (username: string) => void;
}

export const UserImpersonation: FC<UserImpersonationProps> = ({
  uniqueName,
  roles,
  selected,
  firstName,
  lastName,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(uniqueName);
  };

  return (
    <Container
      $selected={selected}
      onClick={handleOnClick}
      data-testid="impersonation-user"
    >
      <Icon
        color={colors.text.static_icons__tertiary.rgba}
        data={account_circle}
      />
      <Typography data-testid="name">
        {firstName} {lastName}
      </Typography>
      <RoleChipContainer>
        {roles.map((role) => (
          <RoleChip key={role} data-testid="role">
            {role}
          </RoleChip>
        ))}
      </RoleChipContainer>
      {selected && (
        <Icon data={check} color={colors.interactive.primary__resting.rgba} />
      )}
    </Container>
  );
};
