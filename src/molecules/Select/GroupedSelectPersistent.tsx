import { SelectOptionRequired } from 'src/molecules';
import { useGroupedSelectItems } from 'src/molecules/Select/Select.hooks';
import { NoItemsFoundText } from 'src/molecules/Select/Select.styles';
import { GroupedSelectPropsCombined } from 'src/molecules/Select/Select.types';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

export const GroupedSelectPersistent = <T extends SelectOptionRequired>(
  props: GroupedSelectPropsCombined<T>
) => {
  const { onItemSelect, onItemKeyDown, itemRefs, CustomMenuItemComponent } =
    props;

  const { filteredGroups, filteredGroupSum } = useGroupedSelectItems(props);

  if (filteredGroups.length === 0) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  if ('values' in props)
    return filteredGroups.map((group, groupIndex) => (
      <div key={`${group.title}-${groupIndex}`}>
        {group.items.map((item, index) => (
          <SelectMenuItem
            key={`${group.title}-${groupIndex}-item-${item.value}`}
            index={index + filteredGroupSum[groupIndex]}
            childOffset={0}
            item={item}
            itemRefs={itemRefs}
            onItemKeyDown={onItemKeyDown}
            onItemSelect={onItemSelect}
            values={props.values}
            CustomMenuItemComponent={CustomMenuItemComponent}
          />
        ))}
      </div>
    ));

  return filteredGroups.map((group, groupIndex) => (
    <div key={`${group.title}-${groupIndex}`}>
      {group.items.map((item, index) => (
        <SelectMenuItem
          key={`${group.title}-${groupIndex}-item-${item.value}`}
          index={index + filteredGroupSum[groupIndex]}
          childOffset={0}
          item={item}
          itemRefs={itemRefs}
          onItemKeyDown={onItemKeyDown}
          onItemSelect={onItemSelect}
          value={props.value}
          CustomMenuItemComponent={CustomMenuItemComponent}
        />
      ))}
    </div>
  ));
};
