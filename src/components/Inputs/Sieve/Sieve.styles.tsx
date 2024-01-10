import {
  Chip as EDSChip,
  Menu,
  Search as EDSSearch,
} from '@equinor/eds-core-react';
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

  color: ${colors.text.static_icons__default.rgba};
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  line-height: normal;
  transition: background 0.15s ease-in;
   
  svg {
    z-index: auto;
    fill: ${colors.text.static_icons__default.rgba};
  }

`;

const Search = styled(EDSSearch)`
  > div {
    box-shadow: none;
    outline: none !important;
    background: ${colors.ui.background__default.rgba};
    > input {
      color: ${colors.text.static_icons__default.rgba};
    }
    > input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.rgba};
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
