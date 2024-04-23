import { useMemo } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { NoItemsFoundText } from './ComboBox.styles';
import {
  ComboBoxMenuProps,
  ComboBoxOptionRequired,
  GroupedComboboxProps,
} from './ComboBox.types';
import { ComboBoxMenuItem } from './ComboBoxMenuItem';
import { getCumulativeArrayFromNumberedArray } from 'src/components/Inputs/ComboBox/ComboBox.utils';

export const GroupedComboBoxMenu = <T extends ComboBoxOptionRequired>(
  props: GroupedComboboxProps<T> & ComboBoxMenuProps<T>
) => {
  const { onItemSelect, onItemKeyDown, itemRefs, groups, search } = props;

  const filteredGroups = useMemo(() => {
    if (search === '') return groups;
    const regexPattern = new RegExp(search, 'i');
    return groups
      .map((group) => ({
        title: group.title,
        items: group.items.filter((item) => item.label.match(regexPattern)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, search]);

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
          <ComboBoxMenuItem
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
        <ComboBoxMenuItem
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
