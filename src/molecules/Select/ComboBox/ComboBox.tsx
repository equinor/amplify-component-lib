import { Select } from 'src/molecules/Select/Select';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';

export type ComboBoxProps<T extends SelectOptionRequired> = CommonSelectProps &
  MultiSelectCommon<T> &
  (GroupedSelectProps<T> | ListSelectProps<T>);

export function ComboBox<T extends SelectOptionRequired>(
  props: ComboBoxProps<T>
) {
  if (props.groups && props.onAddItem) {
    throw new Error(
      "Using 'onAddItem' is only supported in lists and not groups"
    );
  }

  return <Select {...props} />;
}
