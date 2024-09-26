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

/**
 * @param clearable - If users should be able to clear the input, defaults to true
 * @param loading - Show loader, defaults to false
 * @param lightBackground - If the input should have white background, defaults to false
 * @param sortValues - Sort the provided values, defaults to true
 * @param inDialog - Fixes weird issue that EDS menus has when it's used in dialogs, defaults to false
 * @param showHelperIcon - Show helper variant icon, defaults to true
 * @param syncParentChildSelection - Syncs parents/child selections, default is true
 */
export function ComboBox<T extends SelectOptionRequired>(
  props: ComboBoxProps<T>
) {
  if (props.groups && props.onAddItem) {
    throw new Error(
      "[ACL - ComboBox] Using 'onAddItem' is only supported in lists and not groups"
    );
  }

  return <Select {...props} />;
}
