import { tokens } from '@equinor/eds-tokens';

import { BaseChipProps } from './Chip';
import { InteractiveChipProps } from './InteractiveChip';
import { ReadOnlyChipProps } from './ReadOnlyChip';

import styled, { css } from 'styled-components';

const { colors } = tokens;

type Variant = NonNullable<BaseChipProps['variant']>;

const colorSchemes: Record<
  Variant,
  {
    color: string;
    background: string;
    borderColor: string;
    hover: {
      color: string;
      background: string;
      borderColor: string;
    };
    disabled?: {
      color: string;
      background: string;
      borderColor: string;
    };
  }
> = {
  default: {
    color: `${colors.interactive.primary__resting.rgba}`,
    background: `${colors.ui.background__light.rgba}`,
    borderColor: `${colors.ui.background__medium.rgba}`,
    hover: {
      background: `${colors.interactive.primary__hover_alt.rgba}`,
      color: `${colors.interactive.primary__hover.rgba}`,
      borderColor: `${colors.interactive.primary__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.disabled__border.rgba}`,
    },
  },
  active: {
    color: `${colors.interactive.primary__resting.rgba}`,
    background: `${colors.interactive.primary__selected_highlight.rgba}`,
    borderColor: `${colors.interactive.primary__selected_hover.rgba}`,
    hover: {
      color: `${colors.interactive.primary__hover.rgba}`,
      background: `${colors.interactive.primary__selected_hover.rgba}`,
      borderColor: `${colors.interactive.primary__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.disabled__border.rgba}`,
    },
  },
  warning: {
    color: `${colors.interactive.warning__text.rgba}`,
    background: `${colors.ui.background__light.rgba}`,
    borderColor: `${colors.interactive.warning__resting.rgba}`,
    hover: {
      color: `${colors.interactive.warning__hover.rgba}`,
      background: `${colors.ui.background__warning.rgba}`,
      borderColor: `${colors.interactive.warning__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.disabled__border.rgba}`,
    },
  },
  'warning-active': {
    color: `${colors.interactive.warning__text.rgba}`,
    background: `${colors.interactive.primary__selected_highlight.rgba}`,
    borderColor: `${colors.interactive.warning__resting.rgba}`,
    hover: {
      color: `${colors.interactive.warning__hover.rgba}`,
      background: `${colors.interactive.primary__selected_hover.rgba}`,
      borderColor: `${colors.interactive.warning__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.warning__highlight.rgba}`,
    },
  },
  error: {
    color: `${colors.interactive.danger__text.rgba}`,
    background: `${colors.ui.background__light.rgba}`,
    borderColor: `${colors.interactive.danger__resting.rgba}`,
    hover: {
      color: `${colors.interactive.danger__hover.rgba}`,
      background: `${colors.ui.background__danger.rgba}`,
      borderColor: `${colors.interactive.danger__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.disabled__border.rgba}`,
    },
  },

  'error-active': {
    color: `${colors.interactive.danger__text.rgba}`,
    background: `${colors.interactive.primary__selected_highlight.rgba}`,
    borderColor: `${colors.interactive.danger__resting.rgba}`,
    hover: {
      color: `${colors.interactive.danger__hover.rgba}`,
      background: `${colors.interactive.primary__selected_hover.rgba}`,
      borderColor: `${colors.interactive.danger__hover.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: `${colors.interactive.danger__highlight.rgba}`,
    },
  },
};

const getColorSchemeBy = (variant: Variant = 'default') => {
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

  ${({ variant }) => {
    const colorScheme = getColorSchemeBy(variant);
    return css`
      color: ${colorScheme.color};
      background-color: ${colorScheme.background};
      border: 1px solid ${colorScheme.borderColor};

      &:hover {
        background-color: ${colorScheme.hover.background};
        color: ${colorScheme.hover.color};
        border: 1px solid ${colorScheme.hover.borderColor};
      }
      &:disabled {
        color: ${colorScheme.disabled?.color};
        background-color: ${colorScheme.disabled?.background};
        border: 1px solid ${colorScheme.disabled?.borderColor};

        &:hover {
          border: 1px solid ${colorScheme.disabled?.borderColor};
        }
      }
    `;
  }};
  ${(props) =>
    props.disabled &&
    css`
      &:disabled {
        cursor: not-allowed;
      }
    `}
`;

export const ReadOnlyChipStyle = styled.div<ReadOnlyChipProps>`
  ${commonChipStyle}
  cursor: unset;

  ${(props) =>
    props.disabled
      ? css`
          &.disabled {
            background-color: ${colors.interactive.disabled__fill.rgba};
            color: ${colors.interactive.disabled__text.rgba};
            border: 1px solid ${colors.interactive.disabled__fill.rgba};
          }
        `
      : css`
          background-color: ${colors.ui.background__light.rgba};
          color: ${colors.text.static_icons__default.rgba};
          border: 1px solid ${colors.ui.background__medium.rgba};
        `}
`;
