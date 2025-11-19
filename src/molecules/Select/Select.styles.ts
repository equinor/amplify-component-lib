import { Button, Menu as EDSMenu, Typography } from '@equinor/eds-core-react';

import { animation, colors, shape, spacings } from 'src/atoms/style';
import {
  VARIANT_COLORS,
  VARIANT_HELPER_TEXT_COLORS,
} from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';
import { Chip } from 'src/molecules/Chip/Chip';

import styled, { css } from 'styled-components';

interface WrapperProps {
  $showBackgroundColor: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  ${({ $showBackgroundColor }) =>
    $showBackgroundColor &&
    css`
      background-color: ${colors.ui.background__default.rgba};
    `}
`;

interface HelperWrapperProps {
  $variant?: Variants | 'disabled';
  $borderBottom?: boolean;
}

export const HelperWrapper = styled.span<HelperWrapperProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  padding-left: ${spacings.small};
  width: 100%;
  > label {
    margin: 0;
  }
  ${({ $variant }: HelperWrapperProps) => {
    if (!$variant) return '';
    return css`
      > label {
        color: ${$variant === 'disabled'
          ? colors.interactive.disabled__text.rgba
          : VARIANT_HELPER_TEXT_COLORS[$variant]};
      }
      > svg {
        flex-shrink: 0;
        fill: ${$variant === 'disabled'
          ? colors.interactive.disabled__text.rgba
          : VARIANT_HELPER_TEXT_COLORS[$variant]};
      }
    `;
  }}
  ${({ $borderBottom }) =>
    $borderBottom &&
    css`
      border-bottom: 1px solid ${colors.ui.background__heavy.rgba};
      padding-bottom: ${spacings.small};
    `}
`;

interface ContainerProps {
  $lightBackground?: boolean;
  $variant?: Variants;
  $loading?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 6px 8px;
  transition:
    background ${animation.transitionMS},
    box-shadow ${animation.transitionMS};
  &:hover:not(:has(input:disabled)) {
    cursor: pointer;
    background: ${colors.ui.background__light_medium.rgba};
  }

  ${({ $variant }) => {
    if (!$variant)
      return css`
        box-shadow: inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba};
        &:hover {
          box-shadow: inset 0 -2px 0 0
            ${colors.text.static_icons__tertiary.rgba};
        }
      `;

    if ($variant === 'dirty') {
      return css`
        box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        &:hover {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      `;
    }

    return css`
      outline: 1px solid ${VARIANT_COLORS[$variant]};
      &:hover {
        box-shadow: inset 0 -1px 0 0 ${VARIANT_COLORS[$variant]};
      }
    `;
  }}

  ${({ $lightBackground }) =>
    $lightBackground
      ? `background-color: ${colors.ui.background__default.rgba}`
      : `background-color: ${colors.ui.background__light.rgba}`};

  &[aria-expanded='true'] {
    box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
  }

  > svg[role='progressbar'] {
    overflow: unset;
  }
  > svg:not([role='progressbar']) {
    cursor: pointer;
    &:hover {
      background: ${colors.interactive.primary__hover_alt.rgba};
      border-radius: 50%;
    }
  }

  &:has(input:disabled) {
    outline: none;
    cursor: not-allowed;
    box-shadow: inset 0 -1px 0 0 ${colors.interactive.disabled__text.rgba} !important;
    > svg:not([role='progressbar']) {
      cursor: not-allowed;
      fill: ${colors.interactive.disabled__text.rgba};
      &:hover {
        background: transparent;
      }
    }
    > label {
      color: ${colors.interactive.disabled__text.rgba};
    }
  }

  &:has(button#clear) {
    > section {
      width: calc(100% - 24px);
    }
  }
`;

const Section = styled.section`
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
    color: ${colors.text.static_icons__default.rgba};
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
      color: ${colors.interactive.disabled__text.rgba};
    }
    > .amplify-combo-box-chip {
      cursor: not-allowed;
      background: ${colors.interactive.disabled__fill.rgba};
      color: ${colors.interactive.disabled__text.rgba};
      > svg {
        fill: ${colors.interactive.disabled__text.rgba};
        &:hover {
          cursor: not-allowed;
          background: none;
        }
      }
    }
  }
`;

interface ClearButtonProps {
  rightPadding?: boolean;
}

const ClearButton = styled(Button)<ClearButtonProps>`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: ${({ $rightPadding }) =>
    $rightPadding ? spacings.x_large : spacings.small};
  width: 24px;
  height: 24px;
  svg {
    fill: ${colors.text.static_icons__secondary.rgba};
  }
  &:after {
    width: 24px;
    height: 24px;
    left: 0;
  }
`;

interface ComboBoxChipProps {
  $tryingToRemove: boolean;
  $lightBackground?: boolean;
  className: string;
}

const ComboBoxChip = styled(Chip)<ComboBoxChipProps>`
  background: ${({ $tryingToRemove, $lightBackground }) => {
    if ($tryingToRemove) return colors.interactive.primary__hover_alt.rgba;
    if ($lightBackground) return colors.ui.background__light.rgba;
    return colors.ui.background__default.rgba;
  }} !important;
`;

const PersistentGroupsWrapper = styled.div`
  padding: ${spacings.small} 0;
`;

const GroupTitle = styled(Typography)`
  padding: ${spacings.small} 0 ${spacings.small} ${spacings.medium};
`;

interface CustomMenuItemProps {
  $selected?: boolean;
}

const StyledMenuItem = styled(EDSMenu.Item)<CustomMenuItemProps>`
  flex-grow: 1;
  padding-left: 10px;
  
  > div {
    grid-auto-columns: auto;
    justify-content: flex-start;
  }

  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }

  &:focus-visible {
    outline: 2px dashed ${colors.interactive.primary__resting.rgba};
  }

    ${({ $selected }) =>
      $selected
        ? css`
            background: ${colors.interactive.primary__selected_highlight.rgba};

            &:hover {
              background: ${colors.interactive.primary__selected_hover.rgba};
            }
          `
        : ''}}
`;

interface PersistentComboBoxWrapperProps {
  $shouldShowLabel: boolean;
  $maxHeight?: string;
}

const PersistentComboBoxWrapper = styled.div<PersistentComboBoxWrapperProps>`
  border: 1px solid ${colors.ui.background__heavy.rgba};
  border-radius: ${shape.corners.borderRadius};
  overflow: auto;
  background-color: ${colors.ui.background__default.rgba};
  height: ${
    ({ $shouldShowLabel, $maxHeight }) => {
      if ($maxHeight) return $maxHeight;
      return $shouldShowLabel ? css`calc(100% - 16px)` : '100%';
    } // EDS Label component height is 16px
  };
`;

const PersistentStickyWrapper = styled.div`
  position: sticky;
  top: 0;
`;

const PersistentListItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${spacings.medium} ${spacings.medium};
  justify-content: flex-start;
  gap: ${spacings.small};
  box-sizing: border-box;
  svg {
    flex-shrink: 0;
  }
  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
  }
  &:focus-visible {
    outline: 2px dashed ${colors.interactive.primary__resting.rgba};
  }
`;

const MenuItemSpacer = styled.hr`
  height: calc(100% + ${spacings.medium} * 2);
  justify-self: center;
  width: ${spacings.x_large};
  min-width: ${spacings.x_large};
`;

const PlaceholderText = styled(Typography)`
  user-select: none;
  pointer-events: none;
  position: absolute;
  color: ${colors.text.static_icons__tertiary.rgba};
  top: calc(50%);
  transform: translate(0, -50%);
`;

const ValueText = styled(PlaceholderText)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.text.static_icons__default.rgba};
  max-width: 100%;
`;

const NoTagFoundText = styled(Typography)`
  margin: ${spacings.medium};
`;

const NoItemsFoundText = styled(Typography)`
  margin-left: ${spacings.medium};
`;

const StyledMenu = styled(EDSMenu)`
  max-height: 20rem;
  max-width: inherit;
  overflow-y: auto;
  > div {
    width: inherit;
    max-width: inherit;
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SmallButton = styled(Button)`
  width: 36px;
  height: 36px;
`;

export {
  Button,
  ClearButton,
  Container,
  PersistentGroupsWrapper,
  PersistentStickyWrapper,
  GroupTitle,
  MenuItemSpacer,
  StyledMenu,
  NoTagFoundText,
  NoItemsFoundText,
  PlaceholderText,
  PersistentListItem,
  PersistentComboBoxWrapper,
  ComboBoxChip,
  Section,
  MenuItemWrapper,
  SmallButton,
  StyledMenuItem,
  ValueText,
};
