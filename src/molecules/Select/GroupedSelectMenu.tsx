import { useMemo } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { NoItemsFoundText } from 'src/molecules/Select/Select.styles';
import {
  GroupedSelectProps,
  MultiSelectCommon,
  SelectMenuProps,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import { getCumulativeArrayFromNumberedArray } from 'src/molecules/Select/Select.utils';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

export const GroupedSelectMenu = <T extends SelectOptionRequired>(
  props: GroupedSelectProps<T> &
    SelectMenuProps<T> &
    (MultiSelectCommon<T> | SingleSelectCommon<T>)
) => {
  const {
    onItemSelect,
    onItemKeyDown,
    itemRefs,
    groups,
    search,
    onSearchFilter,
  } = props;

  const filteredGroups = useMemo(() => {
    if (search === '') return groups;
    const regexPattern = new RegExp(search, 'i');
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

  if (filteredGroups.length === 0) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  if ('values' in props) {
    return filteredGroups.map((group, groupIndex) => (
      <Menu.Section
        key={`${group.title}-${groupIndex}`}
        index={groupIndex}
        title={group.title}
      >
        {group.items.map((item, index) => (
          <SelectMenuItem
            key={`${group.title}-${groupIndex}-item-${item.value}`}
            index={index + filteredGroupSum[groupIndex]}
            childOffset={0}
            item={item}
            multiselect
            itemRefs={itemRefs}
            onItemKeyDown={onItemKeyDown}
            onItemSelect={onItemSelect}
            values={props.values}
          />
        ))}
      </Menu.Section>
    ));
  }

  return filteredGroups.map((group, groupIndex) => (
    <Menu.Section
      key={`${group.title}-${groupIndex}`}
      index={groupIndex}
      title={group.title}
    >
      {group.items.map((item, index) => (
        <SelectMenuItem
          key={`${group.title}-${groupIndex}-item-${item.value}`}
          index={index + filteredGroupSum[groupIndex]}
          childOffset={0}
          item={item}
          itemRefs={itemRefs}
          onItemKeyDown={onItemKeyDown}
          onItemSelect={onItemSelect}
        />
      ))}
    </Menu.Section>
  ));
};
