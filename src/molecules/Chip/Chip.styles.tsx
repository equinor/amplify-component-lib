import { tokens } from '@equinor/eds-tokens';

import { colors, spacings } from 'src/atoms/style';
import { BaseChipProps } from 'src/molecules/Chip/Chip';
import { InteractiveChipProps } from 'src/molecules/Chip/InteractiveChip';
import { ReadOnlyChipProps } from 'src/molecules/Chip/ReadOnlyChip';

import styled, { css } from 'styled-components';

const { typography, shape } = tokens;

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
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.interactive.primary__resting.rgba}`,
      background: `${colors.interactive.primary__selected_highlight.rgba}`,
      borderColor: `${colors.interactive.primary__selected_hover.rgba}`,
      hover: {
        color: `${colors.interactive.primary__hover.rgba}`,
        background: `${colors.interactive.primary__selected_highlight.rgba}`,
        borderColor: `${colors.text.static_icons__default.rgba}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
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
      borderColor: 'transparent',
    },
  },
  // Per new ACL Figma design, Warning is built on the Data Viz/Orange
  // family rather than the EDS interactive warning tokens.
  warning: {
    color: `${colors.dataviz.orange.darker}`,
    background: `${colors.dataviz.orange.lighter}`,
    borderColor: `${colors.dataviz.orange.lighter}`,
    hover: {
      color: `${colors.dataviz.orange.darker}`,
      background: `${colors.dataviz.orange.lighter}`,
      borderColor: `${colors.dataviz.orange.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.orange.darker}`,
      background: `${colors.dataviz.orange.muted}`,
      borderColor: `${colors.dataviz.orange.muted}`,
      hover: {
        color: `${colors.dataviz.orange.darker}`,
        background: `${colors.dataviz.orange.muted}`,
        borderColor: `${colors.dataviz.orange.darker}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: `${colors.interactive.warning__highlight.rgba}`,
      },
    },
  },
  // "Danger" in the new ACL Figma design.
  error: {
    color: `${colors.interactive.danger__text.rgba}`,
    background: `${colors.interactive.danger__highlight.rgba}`,
    borderColor: 'transparent',
    hover: {
      color: `${colors.interactive.danger__hover.rgba}`,
      background: `${colors.ui.background__danger.rgba}`,
      borderColor: `${colors.interactive.danger__text.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.interactive.danger__highlight.rgba}`,
      background: `${colors.interactive.danger__hover.rgba}`,
      borderColor: `${colors.interactive.danger__hover.rgba}`,
      hover: {
        color: `${colors.interactive.danger__highlight.rgba}`,
        background: `${colors.dataviz.lightpink.darker}`,
        borderColor: `${colors.interactive.danger__text_hover.rgba}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: `${colors.interactive.danger__highlight.rgba}`,
      },
    },
  },
  blue: {
    color: `${colors.dataviz.darkblue.darker}`,
    background: `${colors.dataviz.lightblue.lighter}`,
    borderColor: `${colors.dataviz.lightblue.lighter}`,
    hover: {
      color: `${colors.dataviz.darkblue.darker}`,
      background: `${colors.dataviz.lightblue.lighter}`,
      borderColor: `${colors.dataviz.darkblue.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.darkblue.darker}`,
      background: `${colors.dataviz.lightblue.darker}`,
      borderColor: `${colors.dataviz.lightblue.darker}`,
      hover: {
        color: `${colors.dataviz.darkblue.darker}`,
        background: `${colors.dataviz.lightblue.darker}`,
        borderColor: `${colors.dataviz.darkblue.default}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
      },
    },
  },
  yellow: {
    color: `${colors.dataviz.darkyellow.darker}`,
    background: `${colors.dataviz.lightyellow.lighter}`,
    borderColor: `${colors.dataviz.lightyellow.lighter}`,
    hover: {
      color: `${colors.dataviz.darkyellow.darker}`,
      background: `${colors.dataviz.lightyellow.lighter}`,
      borderColor: `${colors.dataviz.darkyellow.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.darkyellow.darker}`,
      background: `${colors.dataviz.lightyellow.darker}`,
      borderColor: `${colors.dataviz.lightyellow.darker}`,
      hover: {
        color: `${colors.dataviz.darkyellow.darker}`,
        background: `${colors.dataviz.lightyellow.darker}`,
        borderColor: `${colors.dataviz.darkyellow.default}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
      },
    },
  },
  // Purple's own dataviz family covers both the text and background ends of
  // the scale (per Figma), so unlike blue/yellow/green there's no separate
  // "light" family to pull the background from.
  purple: {
    color: `${colors.dataviz.darkpurple.darker}`,
    background: `${colors.dataviz.darkpurple.lighter}`,
    borderColor: `${colors.dataviz.darkpurple.lighter}`,
    hover: {
      color: `${colors.dataviz.darkpurple.darker}`,
      background: `${colors.dataviz.darkpurple.lighter}`,
      borderColor: `${colors.dataviz.darkpurple.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.darkpurple.darker}`,
      background: `${colors.dataviz.lightpurple.default}`,
      borderColor: `${colors.dataviz.lightpurple.default}`,
      hover: {
        color: `${colors.dataviz.darkpurple.darker}`,
        background: `${colors.dataviz.lightpurple.default}`,
        borderColor: `${colors.dataviz.darkpurple.darker}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
      },
    },
  },
  // Pink's own dataviz family (lighter/muted/default/darker) covers the
  // full scale, same reasoning as purple above.
  pink: {
    color: `${colors.dataviz.darkpink.darker}`,
    background: `${colors.dataviz.darkpink.lighter}`,
    borderColor: `${colors.dataviz.darkpink.lighter}`,
    hover: {
      color: `${colors.dataviz.darkpink.darker}`,
      background: `${colors.dataviz.darkpink.lighter}`,
      borderColor: `${colors.dataviz.darkpink.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.darkpink.darker}`,
      background: `${colors.dataviz.darkpink.muted}`,
      borderColor: `${colors.dataviz.darkpink.muted}`,
      hover: {
        color: `${colors.dataviz.darkpink.darker}`,
        background: `${colors.dataviz.darkpink.muted}`,
        borderColor: `${colors.dataviz.darkpink.darker}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
      },
    },
  },
  green: {
    color: `${colors.dataviz.darkgreen.darker}`,
    background: `${colors.dataviz.lightgreen.lighter}`,
    borderColor: `${colors.dataviz.lightgreen.lighter}`,
    hover: {
      color: `${colors.dataviz.darkgreen.darker}`,
      background: `${colors.dataviz.lightgreen.lighter}`,
      borderColor: `${colors.dataviz.darkgreen.darker}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.dataviz.darkgreen.darker}`,
      background: `${colors.dataviz.lightgreen.default}`,
      borderColor: 'transparent',
      hover: {
        color: `${colors.dataviz.darkgreen.darker}`,
        background: `${colors.dataviz.lightgreen.default}`,
        borderColor: `${colors.dataviz.darkgreen.darker}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
      },
    },
  },
  highContrast: {
    color: `${colors.text.static_icons__default.rgba}`,
    background: `${colors.ui.background__default.rgba}`,
    borderColor: `${colors.text.static_icons__default.rgba}`,
    hover: {
      color: `${colors.text.static_icons__default.rgba}`,
      background: `${colors.ui.background__light_medium.rgba}`,
      borderColor: `${colors.text.static_icons__default.rgba}`,
    },
    disabled: {
      color: `${colors.interactive.disabled__text.rgba}`,
      background: `${colors.interactive.disabled__fill.rgba}`,
      borderColor: 'transparent',
    },
    selected: {
      color: `${colors.text.static_icons__default.rgba}`,
      background: `${colors.ui.background__medium.rgba}`,
      borderColor: `${colors.ui.background__medium.rgba}`,
      hover: {
        color: `${colors.text.static_icons__default.rgba}`,
        background: `${colors.ui.background__medium.rgba}`,
        borderColor: `${colors.text.static_icons__default.rgba}`,
      },
      disabled: {
        color: `${colors.interactive.disabled__text.rgba}`,
        background: `${colors.interactive.disabled__fill.rgba}`,
        borderColor: 'transparent',
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

// Read-only chips always use a neutral border, except warning/error which
// keep a subtle tinted border per the ACL Figma design.
const getReadOnlyBorderColor = (variant: Variant = 'default') => {
  if (variant === 'warning') return colors.interactive.warning__highlight.rgba;
  if (variant === 'error') return colors.interactive.danger__highlight.rgba;
  return colors.interactive.disabled__border.rgba;
};

const commonChipStyle = css`
  outline: 1px solid ${colors.ui.background__medium.rgba};
  display: flex;
  width: fit-content;
  border-radius: ${shape.rounded.borderRadius};
  font-family: 'Equinor', sans-serif;
  font-weight: 500;
  font-size: ${typography.ui.chip__badge.fontSize};
  line-height: 16px;
  text-align: center;
  transition:
    background-color 150ms ease,
    outline 150ms ease,
    color 150ms ease;
  padding: ${spacings.x_small};
  box-sizing: content-box;

  .content {
    padding: 0 ${spacings.small};
    display: flex;
    align-items: center;
    gap: ${spacings.x_small};

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
    // White variant has the same selected styling as default
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
    return css`
      color: ${colors.text.static_icons__default.rgba};
      background-color: ${props.variant === 'white'
        ? colorSchemes.white.background
        : colors.ui.background__light.rgba};
      outline: 1px solid ${getReadOnlyBorderColor(props.variant)};
    `;
  }}
`;
