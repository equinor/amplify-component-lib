import { IconData } from '@equinor/eds-icons';

export interface Tab<T> {
  value: T;
  label: string;
  leadingIcon?: IconData;
  disabled?: boolean;
}
export interface Tabs<T> {
  selected: T;
  onChange: (value: T) => void;
  onHover?: (hoveredTabIndex: T) => void;
  options: Tab<T>[];
  scrollable?: boolean;
  amountPerScrollPage?: number;
  centered?: boolean;
  animated?: boolean;
}
