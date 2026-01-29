import { Menu } from '@equinor/eds-core-react';

import { useGroupedSelectItems } from 'src/molecules/Select/Select.hooks';
import { NoItemsFoundText } from 'src/molecules/Select/Select.styles';
import {
  GroupedSelectPropsCombined,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

// Was getting coverage error on the generic type parameter here
/* v8 ignore next */
export const GroupedSelectMenu = <T extends SelectOptionRequired>(
  props: GroupedSelectPropsCombined<T>
) => {
  const {
    onItemSelect,
    onItemKeyDown,
    itemRefs,
    CustomMenuItemComponent,
    mode,
  } = props;

  const { filteredGroups, filteredGroupSum } = useGroupedSelectItems(props);

  if (filteredGroups.length === 0) {
    return <NoItemsFoundText>No items found</NoItemsFoundText>;
  }

  if ('values' in props)
    return filteredGroups.map((group, groupIndex) => (
      <Menu.Section
        key={`${group.title}-${groupIndex}`}
        index={groupIndex}
        title={group.title}
      >
        {group.items.map((item, index) => (
          <SelectMenuItem
            key={`${group.title}-${groupIndex}-item-${item.value}`}
            index={index + filteredGroupSum[groupIndex]}
            childOffset={0}
            item={item}
            mode={mode}
            itemRefs={itemRefs}
            onItemKeyDown={onItemKeyDown}
            onItemSelect={onItemSelect}
            values={props.values}
            CustomMenuItemComponent={CustomMenuItemComponent}
          />
        ))}
      </Menu.Section>
    ));

  return filteredGroups.map((group, groupIndex) => (
    <Menu.Section
      key={`${group.title}-${groupIndex}`}
      index={groupIndex}
      title={group.title}
    >
      {group.items.map((item, index) => (
        <SelectMenuItem
          key={`${group.title}-${groupIndex}-item-${item.value}`}
          index={index + filteredGroupSum[groupIndex]}
          childOffset={0}
          item={item}
          mode={mode}
          itemRefs={itemRefs}
          onItemKeyDown={onItemKeyDown}
          onItemSelect={onItemSelect}
          value={props.value}
          CustomMenuItemComponent={CustomMenuItemComponent}
        />
      ))}
    </Menu.Section>
  ));
};
