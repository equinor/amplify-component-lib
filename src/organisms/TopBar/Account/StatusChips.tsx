import { FC } from 'react';

import {
  RoleChip,
  RolesContainer,
} from 'src/organisms/TopBar/Account/Account.styles';

interface RoleChipsProps {
  roles: { value: string; label: string }[];
}

export const StatusChips: FC<RoleChipsProps> = ({ roles }) => (
  <RolesContainer>
    {roles?.map((role) => (
      <RoleChip key={role.value}>{role.label}</RoleChip>
    ))}
  </RolesContainer>
);
