import { Chip, Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style/spacings';

import styled from 'styled-components';

const { colors, spacings: EDSSpacings } = tokens;

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  box-shadow: inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba};
  padding: ${spacings.medium_small} ${spacings.medium};
  &[aria-expanded='true'] {
    box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
  }
  margin-top: 0.75rem;
  > label {
    position: absolute;
    top: -0.75rem;
    left: 0;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.x_small};
  input[type='search'] {
    background: transparent;
    width: 0;
    flex-grow: 1;
    padding: 0;
    font-family: 'Equinor', sans-serif;
    color: ${colors.text.static_icons__default.rgba};
    outline: none;
    border: none;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    appearance: none;
  }
`;

interface StyledChipProps {
  $tryingToRemove: boolean;
}

export const StyledChip = styled(Chip)<StyledChipProps>`
  background: ${({ $tryingToRemove }) =>
    $tryingToRemove
      ? colors.interactive.primary__hover_alt.rgba
      : colors.ui.background__default.rgba};
`;

interface CustomMenuItemProps {
  $depth: number;
}

export const MenuItemMultiselect = styled(Menu.Item)<CustomMenuItemProps>`
  > div {
    display: grid;
    grid-template-columns:
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr;
  }
`;

export const MenuItemParentSelect = styled(Menu.Item)<CustomMenuItemProps>`
  > div {
    display: grid;
    grid-template-columns:
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr auto;
  }
`;

export const MenuItemSpacer = styled.hr`
  height: calc(100% + ${EDSSpacings.comfortable.medium} * 2);
  width: 2px;
  background: ${colors.ui.background__medium.rgba};
  justify-self: center;
`;

export const PlaceholderText = styled(Typography)`
  position: absolute;
  color: ${colors.text.static_icons__tertiary.rgba};
  top: calc(50%);
  transform: translate(0, -50%);
`;

export const NoItemsFoundText = styled(Typography)`
  margin-left: ${EDSSpacings.comfortable.medium};
`;
