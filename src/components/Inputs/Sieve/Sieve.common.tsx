import { Chip as EDSChip, Menu } from '@equinor/eds-core-react';

import styled from 'styled-components';

export const MenuItem = styled(Menu.Item)`
  outline: none !important;
  > div {
    grid-template-columns: 1fr auto;
  }
`;

export const Chip = styled(EDSChip)`
  background: none;
`;

export type Option = {
  label: string;
  value: string;
};
