import { useMemo } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { AddTagItem } from './AddTagItem';
import {
  NoItemsFoundText,
  NoTagFoundText,
} from 'src/molecules/Select/Select.styles';
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

export const ListSelectMenu = <T extends SelectOptionRequired>(
  props: ListSelectProps<T> &
    SelectMenuProps<T> &
    (
      | Omit<MultiSelectCommon<T>, 'onAddItem' | 'syncParentChildSelection'>
      | SingleSelectCommon<T>
    )
) => {
  const { search, items, onItemSelect, itemRefs, onItemKeyDown } = props;

  const filteredItems = useMemo(() => {
    if (search === '') return items;
    const regexPattern = new RegExp(search, 'i');

    return flattenOptions(items)
      .map(({ value, label }) => ({ value, label }) as SelectOption<T>)
      .filter((item) => item.label.match(regexPattern));
  }, [items, search]);

  if (filteredItems.length === 0 && !props.onAddItem) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  const hasNestedItems = filteredItems.some(
    (i) => i.children && i.children.length > 0
  );

  if ('values' in props) {
    const itemProps = filteredItems.map((item, index) => ({
      childOffset: getChildOffset(filteredItems, index),
      index: index,
      item,
      itemRefs,
      onItemKeyDown,
      onItemSelect,
      itemValue: item.value,
      values: props.values,
      parentHasNestedItems: hasNestedItems,
    }));
    if ('onAddItem' in props && props.onAddItem && search !== '') {
      return (
        <>
          <Menu.Section title="Add tag" index={0}>
            <AddTagItem
              index={0}
              itemRefs={itemRefs}
              onItemKeyDown={onItemKeyDown}
              onAddItem={props.onAddItem}
            >
              {search}
            </AddTagItem>
          </Menu.Section>
          <Menu.Section title="Tag search results" index={1}>
            {itemProps.length > 0 ? (
              itemProps.map((item, index) => (
                <SelectMenuItem
                  key={`menu-item-${index}-${item.itemValue}`}
                  multiselect
                  {...item}
                  index={index + 1}
                />
              ))
            ) : (
              <NoTagFoundText>
                No tag for &quot;{search}&quot; found.
              </NoTagFoundText>
            )}
          </Menu.Section>
        </>
      );
    }

    return itemProps.map((item, index) => (
      <SelectMenuItem
        key={`menu-item-${index}-${item.itemValue}`}
        multiselect
        {...item}
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
      parentHasNestedItems={hasNestedItems}
    />
  ));
};
