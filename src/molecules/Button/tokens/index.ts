import { DANGER_TOKENS } from './danger';
import { PRIMARY_TOKENS } from './primary';
import type { VariantTokens } from './types';

export const TOKEN_MAPPINGS = {
  primary: PRIMARY_TOKENS,
  danger: DANGER_TOKENS,
} as const;

export type { VariantTokens };
