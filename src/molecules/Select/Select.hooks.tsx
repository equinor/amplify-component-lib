import { useMemo } from 'react';

import {
  CustomMenuItemComponentProps,
  GroupedSelectPropsCombined,
  ListSelectMenuProps,
  ListSelectProps,
  MenuModeSelectProps,
  MultiSelectCommon,
  PersistentModeSelectProps,
  SelectMenuProps,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import {
  flattenOptions,
  getCumulativeArrayFromNumberedArray,
} from 'src/molecules/Select/Select.utils';

/* v8 ignore next */
export const useGroupedSelectItems = <T extends SelectOptionRequired>(
  props: GroupedSelectPropsCombined<T>
) => {
  const { groups, search, onSearchFilter } = props;
  const filteredGroups = useMemo(() => {
    if (search === '') return groups;
    const regexPattern = new RegExp(search.trim(), 'i');
    return groups
      .map((group) => ({
        title: group.title,
        items: group.items.filter((item) => {
          if (onSearchFilter !== undefined) {
            return onSearchFilter(search, item);
          }

          return item.label.match(regexPattern);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, onSearchFilter, search]);

  const filteredGroupSum = useMemo(() => {
    const groupSizeArray = filteredGroups.map((group) => group.items.length);
    return getCumulativeArrayFromNumberedArray(groupSizeArray);
  }, [filteredGroups]);

  return { filteredGroups, filteredGroupSum };
};

export const useListSelectItems = <T extends SelectOptionRequired>(
  props: Omit<ListSelectProps<T>, 'onAddItem'> &
    ListSelectMenuProps &
    SelectMenuProps<T> &
    CustomMenuItemComponentProps<T> &
    (PersistentModeSelectProps | MenuModeSelectProps) &
    (
      | Omit<MultiSelectCommon<T>, 'syncParentChildSelection'>
      | SingleSelectCommon<T>
    )
) => {
  const { search, items, onSearchFilter } = props;
  const filteredItems = useMemo(() => {
    if (search === '') return items;
    const regexPattern = new RegExp(search.trim(), 'i');

    return flattenOptions(items).filter((item) => {
      if (onSearchFilter !== undefined) {
        return onSearchFilter(search, item);
      }

      return item.label.match(regexPattern);
    });
  }, [items, onSearchFilter, search]);
  return { filteredItems };
};
