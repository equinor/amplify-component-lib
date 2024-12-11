import {
  checkbox,
  checkbox_indeterminate,
  checkbox_outline,
} from '@equinor/eds-icons';

import { SelectOption, SelectOptionRequired } from 'src/molecules';
import { flattenOptions } from 'src/molecules/Select/Select.utils';

export function getParentIcon<T extends SelectOptionRequired>(
  item: SelectOption<T>,
  values: SelectOption<T>[]
) {
  if (!item.children || item.children.length === 0) return checkbox_outline;

  const isSelected = values.some((value) => value.value === item.value);
  const selectedValues = values.map(({ value }) => value);
  const allOptions = flattenOptions([item])?.map(({ value }) => value);
  if (isSelected) {
    return checkbox;
  } else if (allOptions.some((option) => selectedValues.includes(option))) {
    return checkbox_indeterminate;
  }

  return checkbox_outline;
}
