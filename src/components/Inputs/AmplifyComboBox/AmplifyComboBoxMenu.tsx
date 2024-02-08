import { useMemo } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { MenuItemMultiselect } from './AmplifyComboBox.styles';
import {
  AmplifyComboBoxMenuProps,
  AmplifyComboBoxProps,
  ComboBoxOption,
} from './AmplifyComboBox.types';

const { colors } = tokens;

const AmplifyComboBoxMenu = <T extends ComboBoxOption>(
  props: AmplifyComboBoxProps<T> & AmplifyComboBoxMenuProps<T>
) => {
  const { search, items, onItemSelect, itemRefs, onItemKeyDown } = props;

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
      <MenuItemMultiselect
        ref={(element: HTMLButtonElement) => {
          itemRefs.current[index] = element;
        }}
        index={index}
        tabIndex={index}
        key={`${item.value}-${index}`}
        closeMenuOnClick={false}
        onClick={() => onItemSelect(item)}
        onKeyDownCapture={onItemKeyDown}
      >
        <Icon
          color={colors.interactive.primary__resting.rgba}
          data={
            props.values.find((value) => value.value === item.value)
              ? checkbox
              : checkbox_outline
          }
        />
        {item.label}
      </MenuItemMultiselect>
    ));
  }

  return filteredItems.map((item, index) => (
    <Menu.Item
      ref={(element: HTMLButtonElement) => {
        itemRefs.current[index] = element;
      }}
      index={index}
      tabIndex={index}
      key={`${item.value}-${index}`}
      onClick={() => onItemSelect(item)}
      onKeyDownCapture={onItemKeyDown}
    >
      {item.label}
    </Menu.Item>
  ));
};

export default AmplifyComboBoxMenu;
