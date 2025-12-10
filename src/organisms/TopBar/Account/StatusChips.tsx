import { FC } from 'react';

import {
  RoleChip,
  RolesContainer,
} from 'src/organisms/TopBar/Account/Account.styles';

interface RoleChipsProps {
  statuses: { value: string; label: string }[];
}

export const StatusChips: FC<RoleChipsProps> = ({ statuses }) => (
  <RolesContainer>
    {statuses?.map((status) => (
      <RoleChip key={status.value}>{status.label}</RoleChip>
    ))}
  </RolesContainer>
);
