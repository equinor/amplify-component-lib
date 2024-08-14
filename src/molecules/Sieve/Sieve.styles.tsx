import {
  Chip as EDSChip,
  Menu,
  Search as EDSSearch,
} from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

const Container = styled.div`
  display: flex;
  gap: ${spacings.medium};
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
      box-shadow: inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba};
      &:hover {
        box-shadow: inset 0 -2px 0 0 ${colors.text.static_icons__tertiary.rgba};
      }
      &:focus {
        box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
      }
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
