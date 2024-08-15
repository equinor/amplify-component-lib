import { tokens } from '@equinor/eds-tokens';

import { colors } from 'src/atoms/style';
import { BaseChipProps } from 'src/molecules/Chip/Chip';
import { InteractiveChipProps } from 'src/molecules/Chip/InteractiveChip';
import { ReadOnlyChipProps } from 'src/molecules/Chip/ReadOnlyChip';

import styled, { css } from 'styled-components';

type Variant = NonNullable<BaseChipProps['variant']>;

interface ColorScheme {
  color: string;
  background: string;
  borderColor: string;
  hover: {
    color: string;
    background: string;
    borderColor: string;
  };
  disabled: {
    color: string;
    background: string;
    borderColor: string;
  };
  selected?: Omit<ColorScheme, 'selected'>;
}

export const colorSchemes: Record<Variant, ColorScheme> = {
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
    selected: {
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
  },
  white: {
    color: `${colors.interactive.primary__resting.rgba}`,
    background: `${colors.ui.background__default.rgba}`,
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
    selected: {
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
    selected: {
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
  },
} as const;

const getColorSchemeBy = (variant: Variant = 'default', selected = false) => {
  // When the variant is 'white' and selected = true,
  // the styling is the same as for the 'default' selected variant
  const usingVariant = selected && variant === 'white' ? 'default' : variant;
  const colorScheme = colorSchemes[usingVariant];
  return selected && colorScheme.selected ? colorScheme.selected : colorScheme;
};

const commonChipStyle = css`
  outline: 1px solid ${colors.ui.background__medium.rgba};
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
    outline 150ms ease,
    color 150ms ease;
  padding: ${tokens.spacings.comfortable.x_small};
  box-sizing: content-box;

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
  }
`;

export const InteractiveChipStyle = styled.button<InteractiveChipProps>`
  cursor: pointer;
  ${commonChipStyle}
  ${({ variant, selected }) => {
    // White variant has the same active styling as default
    const colorScheme = getColorSchemeBy(variant, selected);
    return css`
      color: ${colorScheme.color};
      background-color: ${colorScheme.background};
      outline: 1px solid ${colorScheme.borderColor};

      &:hover {
        background-color: ${colorScheme.hover.background};
        color: ${colorScheme.hover.color};
        outline: 1px solid ${colorScheme.hover.borderColor};
      }

      &:disabled {
        color: ${colorScheme.disabled?.color};
        background-color: ${colorScheme.disabled?.background};
        outline: 1px solid ${colorScheme.disabled?.borderColor};
        cursor: not-allowed;

        &:hover {
          outline: 1px solid ${colorScheme.disabled?.borderColor};
        }
      }
    `;
  }};
`;

export const ReadOnlyChipStyle = styled.div<ReadOnlyChipProps>`
  ${commonChipStyle}
  ${(props) => {
    const colorScheme = getColorSchemeBy(props.variant, true);

    return css`
      color: ${colors.text.static_icons__default.rgba};
      background-color: ${props.variant === 'white'
        ? colorSchemes.white.background
        : colors.ui.background__light.rgba};
      outline: 1px solid ${colorScheme.disabled.borderColor};
    `;
  }}
`;
