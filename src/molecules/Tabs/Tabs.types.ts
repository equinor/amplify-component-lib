import { IconData } from '@equinor/eds-icons';

import { Variants } from 'src/atoms/types/variants';

export interface Tab<T> {
  value: T;
  label: string;
  count?: number;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
  variant?: Extract<Variants, 'warning' | 'error'>;
  disabled?: boolean;
}

export interface Tabs<T> {
  selected: T;
  onChange: (value: T) => void;
  onHover?: (hoveredTabValue: T) => void;
  options: Tab<T>[];
  scrollable?: boolean;
  amountPerScrollPage?: number;
  centered?: boolean;
  animated?: boolean;
}
