import { PRIMARY_TOKENS } from './primary';
import { DANGER_TOKENS } from 'src/molecules/ButtonV2/tokens/danger';

export const TOKEN_MAPPINGS = {
  primary: PRIMARY_TOKENS,
  danger: DANGER_TOKENS,
} as const;

export type ButtonTokens =
  (typeof TOKEN_MAPPINGS)[keyof typeof TOKEN_MAPPINGS][keyof (typeof TOKEN_MAPPINGS)[keyof typeof TOKEN_MAPPINGS]];
