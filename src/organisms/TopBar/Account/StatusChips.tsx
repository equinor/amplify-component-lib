import { FC } from 'react';

import { Tag } from 'src/molecules/Tag/Tag';
import { RolesContainer } from 'src/organisms/TopBar/Account/Account.styles';

interface StatusChipsProps {
  statuses: { value: string; label: string }[];
}

export const StatusChips: FC<StatusChipsProps> = ({ statuses }) => (
  <RolesContainer>
    {statuses?.map((status) => (
      <Tag key={status.value} color="grey">
        {status.label}
      </Tag>
    ))}
  </RolesContainer>
);
