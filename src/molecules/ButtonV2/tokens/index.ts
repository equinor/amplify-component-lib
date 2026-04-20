import { PRIMARY_TOKENS } from './primary';
import type { VariantTokens } from './types';
import { DANGER_TOKENS } from 'src/molecules/ButtonV2/tokens/danger';

export const TOKEN_MAPPINGS = {
  primary: PRIMARY_TOKENS,
  danger: DANGER_TOKENS,
} as const;

export type { VariantTokens };
