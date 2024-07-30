import { useMemo } from 'react';

import { NoItemsFoundText } from 'src/molecules/Select/Select.styles';
import {
  ListSelectProps,
  MultiSelectCommon,
  SelectMenuProps,
  SelectOption,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import {
  flattenOptions,
  getChildOffset,
} from 'src/molecules/Select/Select.utils';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

export const SelectMenu = <T extends SelectOptionRequired>(
  props: ListSelectProps<T> &
    SelectMenuProps<T> &
    (MultiSelectCommon<T> | SingleSelectCommon<T>)
) => {
  const {
    search,
    items,
    onItemSelect,
    itemRefs,
    onItemKeyDown,
    onMouseEnterItem,
    selectableParent,
  } = props;

  const filteredItems = useMemo(() => {
    if (search === '') return items;
    const regexPattern = new RegExp(search, 'i');

    return flattenOptions(items)
      .map(({ value, label }) => ({ value, label }) as SelectOption<T>)
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
      <SelectMenuItem
        key={`menu-item-${index}-${item.value}`}
        childOffset={getChildOffset(filteredItems, index)}
        index={index}
        multiselect
        item={item}
        itemRefs={itemRefs}
        onItemKeyDown={onItemKeyDown}
        onItemSelect={onItemSelect}
        onMouseEnterItem={onMouseEnterItem}
        values={props.values}
        selectableParent={selectableParent}
        parentHasNestedItems={hasNestedItems}
      />
    ));
  }

  return filteredItems.map((item, index) => (
    <SelectMenuItem
      key={`menu-item-${index}-${item.value}`}
      childOffset={getChildOffset(filteredItems, index)}
      index={index}
      item={item}
      itemRefs={itemRefs}
      onItemKeyDown={onItemKeyDown}
      onItemSelect={onItemSelect}
      onMouseEnterItem={onMouseEnterItem}
      selectableParent={selectableParent}
      parentHasNestedItems={hasNestedItems}
    />
  ));
};
