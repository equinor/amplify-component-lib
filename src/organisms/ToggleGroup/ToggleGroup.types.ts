import { ReactElement } from 'react';

import { IconData } from '@equinor/eds-icons';

import { ToggleGroupOption } from './ToggleGroupOption';

interface ToggleGroupOptionWithLabel {
  label: string;
  icon?: IconData;
}

interface ToggleGroupOptionOnlyIcon {
  icon: IconData;
}

export type ToggleGroupOption = {
  onToggle: (newValue: boolean) => void;
  checked: boolean;
  disabled?: boolean;
} & (ToggleGroupOptionWithLabel | ToggleGroupOptionOnlyIcon);

/**
 * @param variant - Defaults to 'filled'
 */
export interface ToggleGroup {
  variant?: 'filled' | 'outlined' | 'ghost';
  matchParentHeight?: boolean;
  matchParentWidth?: boolean;
  children: ReactElement<ToggleGroupOption>[];
}
