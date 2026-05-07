import { ButtonHTMLAttributes, ElementType, Ref } from 'react';

export type ButtonVariants = 'filled' | 'outlined' | 'ghost';
export type ButtonColors = 'primary' | 'danger';

export type CommonButtonProps = {
  color?: ButtonColors;
  variant?: ButtonVariants;
  loading?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
