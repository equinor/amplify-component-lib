import { useMemo } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { MenuItemMultiselect } from './AmplifyComboBox.styles';
import {
  AmplifyComboBoxMenuProps,
  AmplifyGroupedComboboxProps,
  ComboBoxOption,
} from './AmplifyComboBox.types';

const { colors } = tokens;

const AmplifyGroupedComboBoxMenu = <T extends ComboBoxOption>(
  props: AmplifyGroupedComboboxProps<T> & AmplifyComboBoxMenuProps<T>
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
    const itemsCount = filteredGroups.map((group) => group.items.length);

    const sum = new Array(itemsCount.length).fill(0);

    for (const [index, itemCount] of itemsCount.entries()) {
      if (index === 0) continue;
      sum[index] = itemCount + sum[index - 1];
    }

    return sum;
  }, [filteredGroups]);

  if (filteredGroups.length === 0) {
    return <p>No items found</p>;
  }

  if ('values' in props) {
    return filteredGroups.map((group, groupIndex) => (
      <Menu.Section
        key={`${group.title}-${groupIndex}`}
        index={groupIndex}
        title={group.title}
      >
        {group.items.map((item, index) => (
          <MenuItemMultiselect
            key={`${group.title}-${groupIndex}-item-${item.value}`}
            ref={(element: HTMLButtonElement) => {
              itemRefs.current[index + filteredGroupSum[groupIndex]] = element;
            }}
            index={index + filteredGroupSum[groupIndex]}
            tabIndex={index + filteredGroupSum[groupIndex]}
            closeMenuOnClick={false}
            onKeyDownCapture={onItemKeyDown}
            onClick={() => onItemSelect(item)}
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
        <Menu.Item
          key={`${group.title}-${groupIndex}-item-${item.value}`}
          ref={(element) => {
            itemRefs.current[index + filteredGroupSum[groupIndex]] = element;
          }}
          index={index + filteredGroupSum[groupIndex]}
          tabIndex={index + filteredGroupSum[groupIndex]}
          onKeyDownCapture={onItemKeyDown}
          onClick={() => onItemSelect(item)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu.Section>
  ));
};

export default AmplifyGroupedComboBoxMenu;
