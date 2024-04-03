import { useMemo } from 'react';

import { NoItemsFoundText } from './ComboBox.styles';
import {
  ComboBoxMenuProps,
  ComboBoxOptionRequired,
  ComboBoxProps,
} from './ComboBox.types';
import { getChildOffset } from './ComboBox.utils';
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
    onMouseEnter,
    selectableParent,
  } = props;

  const filteredItems = useMemo(() => {
    if (search === '') return items;
    const regexPattern = new RegExp(search, 'i');
    return items.filter((item) => item.label.match(regexPattern));
  }, [items, search]);

  if (filteredItems.length === 0) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  if ('values' in props) {
    return filteredItems.map((item, index) => (
      <ComboBoxMenuItem
        key={`menu-item-${index}-${item.value}`}
        childOffset={getChildOffset(filteredItems, index)}
        index={index}
        multiselect
        item={item}
        itemRefs={itemRefs}
        onMouseEnter={onMouseEnter}
        onItemKeyDown={onItemKeyDown}
        onItemSelect={onItemSelect}
        values={props.values}
        selectableParent={selectableParent}
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
      onMouseEnter={onMouseEnter}
      onItemKeyDown={onItemKeyDown}
      onItemSelect={onItemSelect}
      selectableParent={selectableParent}
    />
  ));
};
