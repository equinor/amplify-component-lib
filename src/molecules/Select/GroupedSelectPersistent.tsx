import { Divider } from '@equinor/eds-core-react';

import { SelectOptionRequired } from 'src/molecules';
import { useGroupedSelectItems } from 'src/molecules/Select/Select.hooks';
import {
  GroupTitle,
  NoItemsFoundText,
  PersistentGroupsWrapper,
} from 'src/molecules/Select/Select.styles';
import {
  CustomMenuItemComponentProps,
  GroupedSelectProps,
  MenuModeSelectProps,
  MultiSelectCommon,
  PersistentModeSelectProps,
  SelectMenuProps,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import { SelectMenuItem } from 'src/molecules/Select/SelectMenuItem';

// Ignored because <T extends SelectOptionRequired> is marked at not covered, and is removed at runtime so it cannot be covered.
/* c8 ignore next */
export const GroupedSelectPersistent = <T extends SelectOptionRequired>(
  props: GroupedSelectProps<T> &
    SelectMenuProps<T> &
    CustomMenuItemComponentProps<T> &
    (MultiSelectCommon<T> | SingleSelectCommon<T>) &
    (PersistentModeSelectProps | MenuModeSelectProps)
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

  // This case never happens, since there is a check in select.tsx. This check gives the correct typescript inference.
  /* c8 ignore next */
  if ('value' in props) return null;

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
