import { Select } from '../Select';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
} from '../Select.types';

export type ComboBoxProps<T extends SelectOptionRequired> = CommonSelectProps &
  MultiSelectCommon<T> &
  (GroupedSelectProps<T> | ListSelectProps<T>);

export function ComboBox<T extends SelectOptionRequired>(
  props: ComboBoxProps<T>
) {
  return <Select {...props} />;
}
