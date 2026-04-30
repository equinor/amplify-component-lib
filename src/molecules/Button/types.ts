import { ButtonHTMLAttributes, ElementType, RefObject } from 'react';

export type ButtonVariants = 'filled' | 'outlined' | 'ghost';
export type ButtonColors = 'primary' | 'danger';

export type CommonButtonProps = {
  color?: ButtonColors;
  variant?: ButtonVariants;
  loading?: boolean;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
