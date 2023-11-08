
import { Chip as EDSChip, Menu,Search as EDSSearch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  align-items: center;
`;

const FilterChip = styled(EDSChip)`
  background: ${colors.ui.background__default.hex};
`;

const Search = styled(EDSSearch)`
  > div {
    box-shadow: none;
    outline: none !important;
    background: ${colors.ui.background__default.hex};
    > input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.hex};
    }
  }
`;

const MenuItem = styled(Menu.Item)`
  outline: none !important;
  > div {
    grid-template-columns: 1fr auto;
  }
`;

const Chip = styled(EDSChip)`
  background: none;
`;


export { Chip, Container, FilterChip, MenuItem, Search, Wrapper };
