import { useMemo } from 'react';

import { NoItemsFoundText } from './ComboBox.styles';
import {
  ComboBoxMenuProps,
  ComboBoxOption,
  ComboBoxOptionRequired,
  ComboBoxProps,
} from './ComboBox.types';
import { flattenOptions, getChildOffset } from './ComboBox.utils';
import { ComboBoxMenuItem } from './ComboBoxMenuItem';

export const ComboBoxMenu = <T extends ComboBoxOptionRequired>(
  props: ComboBoxProps<T> & ComboBoxMenuProps<T>
) => {
  const {
    search,
    items,
    onItemSelect,
    itemRefs,
    onItemKeyDown,
    selectableParent,
  } = props;

  const filteredItems = useMemo(() => {
    if (search === '') return items;
    const regexPattern = new RegExp(search, 'i');

    return flattenOptions(items)
      .map(({ value, label }) => ({ value, label }) as ComboBoxOption<T>)
      .filter((item) => item.label.match(regexPattern));
  }, [items, search]);

  if (filteredItems.length === 0) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  const hasNestedItems = filteredItems.some(
    (i) => i.children && i.children.length > 0
  );

  if ('values' in props) {
    return filteredItems.map((item, index) => (
      <ComboBoxMenuItem
        key={`menu-item-${index}-${item.value}`}
        childOffset={getChildOffset(filteredItems, index)}
        index={index}
        multiselect
        item={item}
        itemRefs={itemRefs}
        onItemKeyDown={onItemKeyDown}
        onItemSelect={onItemSelect}
        values={props.values}
        selectableParent={selectableParent}
        parentHasNestedItems={hasNestedItems}
      />
    ));
  }

  return filteredItems.map((item, index) => (
    <ComboBoxMenuItem
      key={`menu-item-${index}-${item.value}`}
      childOffset={getChildOffset(filteredItems, index)}
      index={index}
      item={item}
      itemRefs={itemRefs}
      onItemKeyDown={onItemKeyDown}
      onItemSelect={onItemSelect}
      selectableParent={selectableParent}
      parentHasNestedItems={hasNestedItems}
    />
  ));
};
