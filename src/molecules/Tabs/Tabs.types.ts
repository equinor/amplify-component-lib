import { IconData } from '@equinor/eds-icons';

import { Variants } from 'src/atoms/types/variants';

export interface Tab<T> {
  value: T;
  label: string;
  count?: number | string;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
  variant?: Extract<Variants, 'warning' | 'error'>;
  disabled?: boolean;
}

export interface TabsScrollProps {
  scrollable?: boolean;
  amountPerScrollPage?: number;
}

export interface Tabs<T> extends TabsScrollProps {
  selected: T;
  onChange: (value: T) => void;
  onHover?: (hoveredTabValue: T) => void;
  options: Tab<T>[];
  centered?: boolean;
  animated?: boolean;
}
