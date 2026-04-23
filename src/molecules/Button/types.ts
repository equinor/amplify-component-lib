import { ButtonHTMLAttributes, ElementType, RefObject } from 'react';

export type CommonButtonProps = {
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
