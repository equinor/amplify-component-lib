import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { account_circle, check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ImpersonateUser } from '@equinor/subsurface-app-management';

import { useActiveImpersonationUser } from './hooks/useActiveImpersonationUser';
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
  name,
  uniqueName,
  roles,
  selected,
  onClick,
}) => {
  const { data: activeUserImpersonation } = useActiveImpersonationUser();
  const handleOnClick = () => {
    onClick(uniqueName);
  };

  return (
    <Container
      $selected={selected}
      disabled={activeUserImpersonation?.uniqueName === uniqueName}
      onClick={handleOnClick}
    >
      <Icon
        color={colors.text.static_icons__tertiary.rgba}
        data={account_circle}
      />
      <Typography>{name}</Typography>
      <RoleChipContainer>
        {roles.map((role) => (
          <RoleChip key={role}>{role}</RoleChip>
        ))}
      </RoleChipContainer>
      {selected && (
        <Icon data={check} color={colors.interactive.primary__resting.rgba} />
      )}
    </Container>
  );
};
