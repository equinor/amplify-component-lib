import { FC } from 'react';

import {
  RoleChip,
  RolesContainer,
} from 'src/organisms/TopBar/Account/Account.styles';

interface StatusChipsProps {
  statuses: { value: string; label: string }[];
}

export const StatusChips: FC<StatusChipsProps> = ({ statuses }) => (
  <RolesContainer>
    {statuses?.map((status) => (
      <RoleChip key={status.value}>{status.label}</RoleChip>
    ))}
  </RolesContainer>
);
