import { Button, Chip, Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { colors } from 'src/constants';
import { spacings } from 'src/style/spacings';

import styled from 'styled-components';

const { colors: EDSColors, spacings: EDSSpacings } = tokens;

interface ContainerProps {
  $lightBackground?: boolean;
  $underlineHighlight?: boolean;
  $label?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 6px 64px 6px 8px;

  ${({ $underlineHighlight }) =>
    $underlineHighlight
      ? `box-shadow: inset 0 -2px 0 0 ${colors.dark_blue.rgba}`
      : `box-shadow: inset 0 -1px 0 0 ${EDSColors.text.static_icons__tertiary.rgba}`};

  ${({ $lightBackground }) =>
    $lightBackground
      ? `background-color: ${EDSColors.ui.background__default.rgba}`
      : `background-color: ${EDSColors.ui.background__light.rgba}`};

  &[aria-expanded='true'] {
    box-shadow: inset 0 -2px 0 0 ${EDSColors.interactive.primary__resting.rgba};
  }

  ${({ $label }) => $label && `margin-top: 1rem;`};

  > label {
    position: absolute;
    top: -1rem;
    left: 0;
  }
  > svg[role='progressbar'] {
    overflow: unset;
  }
  > svg:not([role='progressbar']) {
    cursor: pointer;
    &:hover {
      background: ${EDSColors.interactive.primary__hover_alt.rgba};
      border-radius: 50%;
    }
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    box-shadow: none;
    > svg:not([role='progressbar']) {
      cursor: not-allowed;
      fill: ${EDSColors.interactive.disabled__text.rgba};
      &:hover {
        background: transparent;
      }
    }
    > label {
      color: ${EDSColors.interactive.disabled__text.rgba};
    }
  }
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.x_small};
  min-height: 24px;
  input[type='search'] {
    background: transparent;
    width: 0;
    flex-grow: 1;
    padding: 0;
    font-family: 'Equinor', sans-serif;
    color: ${EDSColors.text.static_icons__default.rgba};
    outline: none;
    border: none;
  }
  input[type='search']:disabled {
    cursor: not-allowed;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    appearance: none;
  }
  &:has(input:disabled) {
    > p {
      color: ${EDSColors.interactive.disabled__text.rgba};
    }
    > .amplify-combo-box-chip {
      cursor: not-allowed;
      background: ${EDSColors.interactive.disabled__fill.rgba};
      color: ${EDSColors.interactive.disabled__text.rgba};
      > svg {
        fill: ${EDSColors.interactive.disabled__text.rgba};
        &:hover {
          cursor: not-allowed;
          background: none;
        }
      }
    }
  }
`;

export const InputAdornments = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  padding-right: ${spacings.small};
`;

export const ClearButton = styled(Button)`
  width: 24px;
  height: 24px;
  &:after {
    width: 24px;
    height: 24px;
    left: 0;
  }
`;

export const ToggleButton = styled(Button)`
  width: 24px;
  height: 24px;
`;

interface StyledChipProps {
  $tryingToRemove: boolean;
  $lightBackground?: boolean;
}

export const StyledChip = styled(Chip)<StyledChipProps>`
  background: ${({ $tryingToRemove, $lightBackground }) =>
    $tryingToRemove
      ? EDSColors.interactive.primary__hover_alt.rgba
      : $lightBackground
      ? EDSColors.ui.background__light.rgba
      : EDSColors.ui.background__default.rgba};
`;

interface CustomMenuItemProps {
  $depth: number;
}

export const MenuItemMultiselect = styled(Menu.Item)<CustomMenuItemProps>`
  &:focus {
    outline: none;
    border: none;
    background-color: ${EDSColors.ui.background__medium.rgba};
  }
  > div {
    display: grid;
    /* This is tested but the code coverage doesn't recognize it */
    grid-template-columns:
      /* c8 ignore next */
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr;
  }
`;

export const MenuItemParentSelect = styled(Menu.Item)<CustomMenuItemProps>`
  &:focus {
    outline: none;
    border: none;
    background-color: ${EDSColors.ui.background__medium.rgba};
  }
  > div {
    display: grid;
    /* This is tested but the code coverage doesn't recognize it */
    grid-template-columns:
      /* c8 ignore next */
      ${({ $depth }) => ($depth > 0 ? '24px '.repeat($depth) : '')}
      auto 1fr auto;
  }
`;

export const MenuItemSpacer = styled.hr`
  height: calc(100% + ${EDSSpacings.comfortable.medium} * 2);
  width: 2px;
  background: ${EDSColors.ui.background__medium.rgba};
  justify-self: center;
`;

export const PlaceholderText = styled(Typography)`
  color: ${EDSColors.text.static_icons__default.rgba};
`;

export const NoItemsFoundText = styled(Typography)`
  margin-left: ${EDSSpacings.comfortable.medium};
`;

export const MenuItem = styled(Menu.Item)`
  &:focus {
    outline: none;
    border: none;
    background-color: ${EDSColors.ui.background__medium.rgba};
  }
`;
