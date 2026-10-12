import { tokens } from '@equinor/eds-tokens';

import { ButtonVariants } from '../types';
import { PRIMARY_TOKENS } from './primary';
import { ButtonTokens, VariantTokens } from './types';

const variants = ['filled', 'outlined', 'ghost'] as const;
const states = ['resting', 'hover', 'pressed'] as const;
type State = (typeof states)[number];
type StateTokens = Pick<
  VariantTokens,
  'backgroundColor' | 'color' | 'borderColor'
>;

function stateVariables(variant: ButtonVariants, state: State) {
  const prefix = `--amplify_button_${variant}_${state}`;
  return {
    backgroundColor: `${prefix}_background`,
    color: `${prefix}_color`,
    borderColor: `${prefix}_border`,
  };
}

function inheritedState(
  variant: ButtonVariants,
  state: State,
  fallback: StateTokens
): StateTokens {
  const variables = stateVariables(variant, state);
  return {
    backgroundColor: `var(${variables.backgroundColor}, ${fallback.backgroundColor})`,
    color: `var(${variables.color}, ${fallback.color})`,
    borderColor: `var(${variables.borderColor}, ${fallback.borderColor ?? fallback.backgroundColor})`,
  };
}

function inheritedVariant(variant: ButtonVariants): VariantTokens {
  const fallback = PRIMARY_TOKENS[variant];
  return {
    ...inheritedState(variant, 'resting', fallback),
    outlineColor: `var(--amplify_button_${variant}_outline, ${fallback.outlineColor})`,
    hover: inheritedState(variant, 'hover', fallback.hover),
    pressed: inheritedState(variant, 'pressed', fallback.pressed),
    disabled: fallback.disabled,
  };
}

export const INHERITED_BUTTON_TOKENS = {
  filled: inheritedVariant('filled'),
  outlined: inheritedVariant('outlined'),
  ghost: inheritedVariant('ghost'),
} satisfies ButtonTokens;

// Preserve EDS spinner colors when no ancestor palette is present.
export function getInheritedLoadingColors(variant: ButtonVariants) {
  const { interactive, infographic, ui } = tokens.colors;
  const filled = variant === 'filled';
  const color = filled
    ? interactive.icon_on_interactive_colors.rgba
    : infographic.primary__moss_green_100.rgba;
  const track = filled
    ? ui.background__semitransparent.rgba
    : infographic.primary__moss_green_13.rgba;
  return {
    color: `var(${stateVariables(variant, 'resting').color}, ${color})`,
    track: `var(--amplify_button_${variant}_loading_track, ${track})`,
  };
}

export function createButtonTokenVariables(tokens: ButtonTokens) {
  const variables: Record<string, string> = {};
  for (const variant of variants) {
    const variantTokens = tokens[variant];
    variables[`--amplify_button_${variant}_loading_track`] =
      `color-mix(in srgb, ${variantTokens.color} 20%, transparent)`;
    variables[`--amplify_button_${variant}_outline`] =
      variantTokens.outlineColor;
    for (const state of states) {
      const stateTokens =
        state === 'resting' ? variantTokens : variantTokens[state];
      const names = stateVariables(variant, state);
      variables[names.backgroundColor] = stateTokens.backgroundColor;
      variables[names.color] = stateTokens.color;
      variables[names.borderColor] =
        stateTokens.borderColor ?? stateTokens.backgroundColor;
    }
  }
  return variables;
}
