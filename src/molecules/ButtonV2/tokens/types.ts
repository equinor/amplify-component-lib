export type Variants = 'filled' | 'outlined' | 'ghost';

export interface VariantTokens {
  backgroundColor: string;
  color: string;
  outlineColor: string;
  borderColor?: string;
  hover: {
    backgroundColor: string;
    color: string;
    borderColor?: string;
  };
  pressed: {
    backgroundColor: string;
    color: string;
    borderColor?: string;
  };
  disabled: {
    backgroundColor: string;
    color: string;
    borderColor?: string;
  };
}

export type ButtonTokens = Record<Variants, VariantTokens>;
