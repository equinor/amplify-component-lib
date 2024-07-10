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
  return <Select {...props} />;
}
