import { AddTagItem } from './AddTagItem';
import { capitalize } from 'src/atoms';
import { useListSelectItems } from 'src/molecules/Select/Select.hooks';
import {
  GroupTitle,
  NoItemsFoundText,
  NoTagFoundText,
} from 'src/molecules/Select/Select.styles';
import {
  CustomMenuItemComponentProps,
  ListSelectMenuProps,
  ListSelectProps,
  MenuModeSelectProps,
  MultiSelectCommon,
  MultiSelectMenuItemProps,
  PersistentModeSelectProps,
  SelectMenuProps,
  SelectOptionRequired,
  SingleSelectCommon,
  SingleSelectMenuItemProps,
} from 'src/molecules/Select/Select.types';
import { getChildOffset } from 'src/molecules/Select/Select.utils';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

// Ignored because <T extends SelectOptionRequired> is marked at not covered, and is removed at runtime so it cannot be covered.
/* c8 ignore next */
export const ListSelectPersistent = <T extends SelectOptionRequired>(
  props: Omit<ListSelectProps<T>, 'onAddItem'> &
    ListSelectMenuProps &
    SelectMenuProps<T> &
    CustomMenuItemComponentProps<T> &
    (PersistentModeSelectProps | MenuModeSelectProps) &
    (
      | Omit<MultiSelectCommon<T>, 'syncParentChildSelection'>
      | SingleSelectCommon<T>
    )
) => {
  const { search, itemRefs, onItemKeyDown, mode } = props;

  const { filteredItems } = useListSelectItems(props);

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
        <GroupTitle
          group="navigation"
          variant="label"
        >{`Add ${singularWord}`}</GroupTitle>
        <AddTagItem
          index={0}
          itemRefs={itemRefs}
          onItemKeyDown={onItemKeyDown}
          onAddItem={props.onAddItem}
          addItemSingularWord={singularWord}
          mode={mode}
        >
          {search}
        </AddTagItem>
        <GroupTitle
          group="navigation"
          variant="label"
        >{`${capitalize(singularWord)} search results`}</GroupTitle>
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
