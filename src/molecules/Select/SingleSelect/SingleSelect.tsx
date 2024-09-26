import { Select } from 'src/molecules/Select/Select';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';

export type SingleSelectProps<T extends SelectOptionRequired> =
  CommonSelectProps &
    SingleSelectCommon<T> &
    (GroupedSelectProps<T> | ListSelectProps<T>);

/**
 * @param clearable - If users should be able to clear the input, defaults to true
 * @param loading - Show loader, defaults to false
 * @param lightBackground - If the input should have white background, defaults to false
 * @param sortValues - Sort the provided values, defaults to true
 * @param inDialog - Fixes weird issue that EDS menus has when it's used in dialogs, defaults to false
 * @param showHelperIcon - Show helper variant icon, defaults to true
 */
export function SingleSelect<T extends SelectOptionRequired>(
  props: SingleSelectProps<T>
) {
  return <Select {...props} />;
}
