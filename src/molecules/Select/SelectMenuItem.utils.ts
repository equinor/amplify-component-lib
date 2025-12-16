import {
  checkbox,
  checkbox_indeterminate,
  checkbox_outline,
  IconData,
} from '@equinor/eds-icons';

import {
  SelectedState,
  SelectOption,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';
import { flattenOptions } from 'src/molecules/Select/Select.utils';

const ICONS_BY_STATE: Record<SelectedState, IconData> = {
  selected: checkbox,
  indeterminate: checkbox_indeterminate,
  none: checkbox_outline,
};

export function getParentIcon<T extends SelectOptionRequired>(
  item: SelectOption<T>,
  values: SelectOption<T>[]
) {
  const state = getParentState(item, values);
  return ICONS_BY_STATE[state];
}

export function getParentState<T extends SelectOptionRequired>(
  item: SelectOption<T>,
  values: SelectOption<T>[]
): SelectedState {
  const isSelected = values.some((value) => value.value === item.value);
  const selectedValues = values.map(({ value }) => value);
  const allOptions = flattenOptions([item])?.map(({ value }) => value);
  if (isSelected) {
    return 'selected';
  } else if (allOptions.some((option) => selectedValues.includes(option))) {
    return 'indeterminate';
  }

  return 'none';
}
