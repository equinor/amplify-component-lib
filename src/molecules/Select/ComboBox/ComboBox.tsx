import { Select } from 'src/molecules/Select/Select';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';

// export type ListComboBoxProps<T extends SelectOptionRequired> =
//   CommonSelectProps<T> & MultiSelectCommon<T> & ListSelectProps<T>;
//
// export type GroupedComboBoxProps<T extends SelectOptionRequired> =
//   CommonSelectProps<T> & MultiSelectCommon<T> & GroupedSelectProps<T>;
// TODO:PERSISTENT look into if this typing works as expected
export type ComboBoxProps<T extends SelectOptionRequired> =
  CommonSelectProps<T> &
    MultiSelectCommon<T> &
    (ListSelectProps<T> | GroupedSelectProps<T>);

/**
 * @param clearable - If users should be able to clear the input, defaults to true
 * @param loading - Show loader, defaults to false
 * @param lightBackground - If the input should have white background, defaults to false
 * @param sortValues - Sort the provided values, defaults to true
 * @param inDialog - Fixes weird issue that EDS menus has when it's used in dialogs, defaults to false
 * @param showHelperIcon - Show helper variant icon, defaults to true
 * @param syncParentChildSelection - Syncs parents/child selections, default is true
 * @param onAddItem - Enables the possibility to add extra tags and is called when submitting a new item, either via menu click 'add' or {Enter}. Not supported with groups prop.
 * @param addItemSingularWord - Word to use when adding a new item, default is "tag"
 * @param onSearchFilter - Custom filter function for search, default is "item.label.match(new RegExp(searchValue, 'i'))"
 * @param showSelectedAsText - If values should be shown as "5/10 Selected", defaults to false
 * @param customMenuItemComponent - Custom component to use for rendering menu item, defaults to a checkbox with label
 */
export function ComboBox<T extends SelectOptionRequired>(
  props: ComboBoxProps<T>
) {
  return <Select {...props} />;
}
