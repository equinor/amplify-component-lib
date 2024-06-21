import { tokens } from '@equinor/eds-tokens';

import styled, { css } from 'styled-components';

const { colors } = tokens;

import { BaseChipProps, InteractiveChipProps, ReadOnlyChipProps } from './Chip';

const getColorSchemeBy = (variant: BaseChipProps['variant'] = 'default') => {
  const colorSchemes = {
    default: {
      backgroundColor: `${colors.ui.background__light.rgba}`,
      color: `${colors.interactive.primary__resting.rgba}`,
      borderColor: `${colors.ui.background__medium.rgba}`,
      hover: {
        backgroundColor: `${colors.interactive.primary__hover_alt.rgba}`,
        color: `${colors.interactive.primary__hover.rgba}`,
        borderColor: `${colors.interactive.primary__hover.rgba}`,
      },
      disabled: {
        backgroundColor: `${colors.interactive.disabled__fill.rgba}`,
        color: `${colors.interactive.disabled__text.rgba}`,
        borderColor: `${colors.interactive.disabled__fill.rgba}`,
      },
    },
    active: {
      color: `${colors.interactive.primary__resting.rgba}`,
      backgroundColor: `${colors.interactive.primary__selected_highlight.rgba}`,
      borderColor: `${colors.interactive.primary__selected_hover.rgba}`,
      hover: {
        color: `${colors.interactive.primary__hover.rgba}`,
        backgroundColor: `${colors.interactive.primary__selected_hover.rgba}`,
        borderColor: `${colors.interactive.primary__hover.rgba}`,
      },
      disabled: {
        backgroundColor: `${colors.interactive.disabled__fill.rgba}`,
        color: `${colors.interactive.disabled__text.rgba}`,
        borderColor: `${colors.interactive.primary__selected_hover.rgba}`,
      },
    },
    error: {
      color: `${colors.interactive.danger__text.rgba}`,
      backgroundColor: `${colors.ui.background__light.rgba}`,
      borderColor: `${colors.interactive.danger__resting.rgba}`,
      hover: {
        color: `${colors.interactive.danger__hover.rgba}`,
        backgroundColor: `${colors.ui.background__danger.rgba}`,
        borderColor: `${colors.interactive.danger__hover.rgba}`,
      },
      disabled: {
        backgroundColor: `${colors.interactive.disabled__fill.rgba}`,
        color: `${colors.interactive.disabled__text.rgba}`,
        borderColor: `${colors.interactive.disabled__fill.rgba}`,
      },
    },
    warning: {
      color: `${colors.interactive.warning__text.rgba}`,
      backgroundColor: `${colors.ui.background__light.rgba}`,
      borderColor: `${colors.interactive.warning__resting.rgba}`,
      hover: {
        color: `${colors.interactive.warning__hover.rgba}`,
        backgroundColor: `${colors.ui.background__warning.rgba}`,
        borderColor: `${colors.interactive.warning__hover.rgba}`,
      },
      disabled: {
        backgroundColor: `${colors.interactive.disabled__fill.rgba}`,
        color: `${colors.interactive.disabled__text.rgba}`,
        borderColor: `${colors.interactive.disabled__fill.rgba}`,
      },
    },
  };

  return colorSchemes[variant];
};

const commonChipStyle = css`
  border: 1px solid ${colors.ui.background__medium.rgba};
  cursor: pointer;
  display: flex;
  width: fit-content;
  border-radius: ${tokens.shape.rounded.borderRadius};
  font-family: 'Equinor', sans-serif;
  font-weight: 500;
  font-size: ${tokens.typography.ui.chip__badge.fontSize};
  line-height: 16px;
  text-align: center;
  transition:
    background-color 150ms ease,
    border 150ms ease,
    color 150ms ease;

  padding: ${tokens.spacings.comfortable.x_small};

  .content {
    padding: 0 ${tokens.spacings.comfortable.small};
    display: flex;
    align-items: center;
    gap: ${tokens.spacings.comfortable.x_small};

    .leading {
      display: flex;
      align-items: center;
    }
    .leading * {
      width: 16px;
      height: 16px;
    }

    span {
    }
  }
`;

export const InteractiveChipStyle = styled.button<InteractiveChipProps>`
  ${commonChipStyle}

  ${({ variant }) => css`
    color: ${getColorSchemeBy(variant).color};
    background-color: ${getColorSchemeBy(variant).backgroundColor};
    border: 1px solid ${getColorSchemeBy(variant).borderColor};

    &:hover {
      background-color: ${getColorSchemeBy(variant).hover.backgroundColor};
      color: ${getColorSchemeBy(variant).hover.color};
      border: 1px solid ${getColorSchemeBy(variant).hover.borderColor};
    }
    &:disabled {
      background-color: ${getColorSchemeBy(variant).disabled.backgroundColor};
      color: ${getColorSchemeBy(variant).disabled.color};
      &:hover {
        border: 1px solid ${getColorSchemeBy(variant).borderColor};
      }
    }
  `};
  ${(disabled) =>
    disabled
      ? css`
          &:disabled {
            cursor: not-allowed;
          }
        `
      : ''}
`;

export const ReadOnlyChipStyle = styled.div<ReadOnlyChipProps>`
  ${commonChipStyle}
  cursor: unset;

  ${(disabled) =>
    disabled
      ? css`
          &.disabled {
            background-color: ${colors.interactive.disabled__fill.rgba};
            color: ${colors.interactive.disabled__text.rgba};
            border: 1px solid ${colors.interactive.disabled__fill.rgba};
          }
        `
      : css`
          background-color: red;
        `}
`;
