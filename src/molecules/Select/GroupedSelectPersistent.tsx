import { Divider } from '@equinor/eds-core-react';

import { SelectOptionRequired } from 'src/molecules';
import { useGroupedSelectItems } from 'src/molecules/Select/Select.hooks';
import {
  GroupTitle,
  NoItemsFoundText,
  PersistentGroupsWrapper,
} from 'src/molecules/Select/Select.styles';
import { GroupedSelectPropsCombined } from 'src/molecules/Select/Select.types';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

export const GroupedSelectPersistent = <T extends SelectOptionRequired>(
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

  if ('value' in props) {
    throw new Error('You can not use persistent mode with SingleSelect');
  }

  return (
    <PersistentGroupsWrapper>
      {filteredGroups.map((group, groupIndex, groupArr) => (
        <div key={`${group.title}-${groupIndex}`}>
          <GroupTitle group="navigation" variant="label">
            {group.title}
          </GroupTitle>
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
              mode={mode}
              CustomMenuItemComponent={CustomMenuItemComponent}
            />
          ))}
          {groupIndex < groupArr.length - 1 && <Divider />}
        </div>
      ))}
    </PersistentGroupsWrapper>
  );
};
