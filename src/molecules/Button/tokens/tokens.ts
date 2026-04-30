import { DANGER_TOKENS } from 'src/molecules/Button/tokens/danger';
import { PRIMARY_TOKENS } from 'src/molecules/Button/tokens/primary';
import type { VariantTokens } from 'src/molecules/Button/tokens/types';

export const TOKEN_MAPPINGS = {
  primary: PRIMARY_TOKENS,
  danger: DANGER_TOKENS,
} as const;

export type { VariantTokens };
