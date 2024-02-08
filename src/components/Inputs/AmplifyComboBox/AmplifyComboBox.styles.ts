import { Menu } from '@equinor/eds-core-react';

import styled from 'styled-components';

export const MenuItemMultiselect = styled(Menu.Item)`
  > div {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`;
