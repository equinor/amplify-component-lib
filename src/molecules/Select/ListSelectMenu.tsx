import { useMemo } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { AddTagItem } from './AddTagItem';
import { capitalize } from 'src/atoms/utils/string';
import {
  NoItemsFoundText,
  NoTagFoundText,
} from 'src/molecules/Select/Select.styles';
import {
  CustomMenuItemComponentProps,
  ListSelectMenuProps,
  ListSelectProps,
  MultiSelectCommon,
  MultiSelectMenuItemProps,
  SelectMenuProps,
  SelectOptionRequired,
  SingleSelectCommon,
  SingleSelectMenuItemProps,
} from 'src/molecules/Select/Select.types';
import {
  flattenOptions,
  getChildOffset,
} from 'src/molecules/Select/Select.utils';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

export const ListSelectMenu = <T extends SelectOptionRequired>(
  props: Omit<ListSelectProps<T>, 'onAddItem'> &
    ListSelectMenuProps &
    SelectMenuProps<T> &
    CustomMenuItemComponentProps<T> &
    (
      | Omit<MultiSelectCommon<T>, 'syncParentChildSelection'>
      | SingleSelectCommon<T>
    )
) => {
  const { search, items, itemRefs, onItemKeyDown, onSearchFilter } = props;

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

  if (filteredItems.length === 0 && (!props.onAddItem || search === '')) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  const hasNestedItems = filteredItems.some(
    (i) => i.children && i.children.length > 0
  );

  const itemProps: Array<
    SingleSelectMenuItemProps<T> | MultiSelectMenuItemProps<T>
  > = filteredItems.map((item, index) => ({
    childOffset: getChildOffset(filteredItems, index),
    index: index,
    item,
    itemValue: item.value,
    parentHasNestedItems: hasNestedItems,
    ...props,
  }));

  if (
    'onAddItem' in props &&
    props.onAddItem &&
    search !== '' &&
    ((filteredItems.length === 1 &&
      filteredItems.at(0)?.label.toLowerCase() !==
        search.trim().toLowerCase()) ||
      filteredItems.length !== 1)
  ) {
    const singularWord = props.itemSingularWord
      ? props.itemSingularWord
      : 'tag';
    return (
      <>
        <Menu.Section title={`Add ${singularWord}`} index={0}>
          <AddTagItem
            index={0}
            itemRefs={itemRefs}
            onItemKeyDown={onItemKeyDown}
            onAddItem={props.onAddItem}
            addItemSingularWord={singularWord}
          >
            {search}
          </AddTagItem>
        </Menu.Section>
        <Menu.Section
          title={`${capitalize(singularWord)} search results`}
          index={1}
        >
          {itemProps.length > 0 ? (
            itemProps.map((item, index) => (
              <SelectMenuItem
                key={`menu-item-${index}-${item.item.value}`}
                {...item}
                index={index + 1}
              />
            ))
          ) : (
            <NoTagFoundText>
              No {singularWord} for &quot;{search}&quot; found.
            </NoTagFoundText>
          )}
        </Menu.Section>
      </>
    );
  }

  return itemProps.map((item, index) => (
    <SelectMenuItem
      key={`menu-item-${index}-${item.item.value}`}
      {...item}
      index={index}
    />
  ));
};
