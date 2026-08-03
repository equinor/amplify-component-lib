import { ReactElement } from 'react';

import { IconData } from '@equinor/eds-icons';

import { ToggleGroupOption } from './ToggleGroupOption';
import type { TooltipProps } from 'src/molecules';

interface ToggleGroupOptionWithLabel {
  label: string;
  icon?: IconData;
}

interface ToggleGroupOptionOnlyIcon {
  icon: IconData;
  tooltip?: undefined;
}

interface ToggleGroupOptionOnlyIconWithTooltip {
  icon: IconData;
  tooltip: string;
  tooltipPlacement?: TooltipProps['placement'];
}

export type ToggleGroupOption = {
  onToggle: (newValue: boolean) => void;
  checked: boolean;
  disabled?: boolean;
} & (
  | ToggleGroupOptionWithLabel
  | ToggleGroupOptionOnlyIcon
  | ToggleGroupOptionOnlyIconWithTooltip
);

/**
 * @param variant - Defaults to 'filled'
 */
export interface ToggleGroup {
  variant?: 'filled' | 'outlined' | 'ghost';
  matchParentHeight?: boolean;
  matchParentWidth?: boolean;
  children: ReactElement<ToggleGroupOption>[];
}
