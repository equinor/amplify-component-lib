import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  Ref,
} from 'react';

export type ButtonVariants = 'filled' | 'outlined' | 'ghost';
export type ButtonColors = 'primary' | 'danger';

export type CommonButtonProps = {
  /** Overrides inherited colors (for example, inside a banner); defaults to primary otherwise. */
  color?: ButtonColors;
  variant?: ButtonVariants;
  loading?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonHTMLAttributes<HTMLButtonElement>
  >;
