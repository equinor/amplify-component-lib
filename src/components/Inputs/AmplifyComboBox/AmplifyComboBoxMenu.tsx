import { useMemo } from 'react';

import {
  AmplifyComboBoxMenuProps,
  AmplifyComboBoxProps,
  ComboBoxOption,
} from './AmplifyComboBox.types';
import { getChildOffset } from './AmplifyComboBox.utils';
import AmplifyComboBoxMenuItem from './AmplifyComboBoxMenuItem';

const AmplifyComboBoxMenu = <T extends ComboBoxOption<T>>(
  props: AmplifyComboBoxProps<T> & AmplifyComboBoxMenuProps<T>
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
    return items.filter((item) => item.label.match(regexPattern));
  }, [items, search]);

  if (filteredItems.length === 0) {
    return <p>No items found</p>;
  }

  if ('values' in props) {
    return filteredItems.map((item, index) => (
      <AmplifyComboBoxMenuItem
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
      />
    ));
  }

  return filteredItems.map((item, index) => (
    <AmplifyComboBoxMenuItem
      key={`menu-item-${index}-${item.value}`}
      childOffset={getChildOffset(filteredItems, index)}
      index={index}
      item={item}
      itemRefs={itemRefs}
      onItemKeyDown={onItemKeyDown}
      onItemSelect={onItemSelect}
      selectableParent={selectableParent}
    />
  ));
};

export default AmplifyComboBoxMenu;
