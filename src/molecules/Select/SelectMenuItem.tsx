import { KeyboardEvent, MouseEvent, useMemo, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_right } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { getChildOffset, getNextEnabledItemIndex } from './Select.utils';
import { spacings } from 'src/atoms/style/spacings';
import { DynamicMenuItem } from 'src/molecules/Select/DynamicMenuItem';
import {
  MenuItemSpacer,
  MenuItemWrapper,
  SmallButton,
} from 'src/molecules/Select/Select.styles';
import {
  MultiSelectMenuItemProps,
  SelectOptionRequired,
  SingleSelectMenuItemProps,
} from 'src/molecules/Select/Select.types';

const { colors } = tokens;

export const SelectMenuItem = <T extends SelectOptionRequired>(
  props: SingleSelectMenuItemProps<T> | MultiSelectMenuItemProps<T>
) => {
  const {
    index,
    childOffset,
    depth = 0,
    item,
    itemRefs,
    onItemKeyDown,
    onItemSelect,
    CustomMenuItemComponent,
    mode,
  } = props;
  const [openParent, setOpenParent] = useState(false);
  const childRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedValues =
    'values' in props ? props.values.map(({ value }) => value) : [];
  const isSelected = selectedValues.includes(item.value);
  const isItemDisabled = Boolean(props.disabled || item.disabled);

  const spacers = useMemo(
    () =>
      new Array(depth)
        .fill(0)
        .map((num, index) => <MenuItemSpacer key={`spacer-${num + index}`} />),
    [depth]
  );

  const handleChevronIconClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (isItemDisabled) return;
    setOpenParent((prev) => !prev);
  };

  const handleOnChildKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    fromIndex = childRefs.current.indexOf(event.currentTarget)
  ) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const nextIndex = getNextEnabledItemIndex(
      childRefs.current,
      fromIndex === -1 ? childOffset - 1 : fromIndex,
      event.key === 'ArrowDown' ? 1 : -1
    );

    if (nextIndex !== -1) {
      childRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      itemRefs.current[index]?.focus();
    } else {
      // Keep focus on the parent if there is no enabled item after this subtree.
      itemRefs.current[index]?.focus();
      onItemKeyDown(event, index);
      setOpenParent(false);
    }
  };

  const handleOnParentKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isItemDisabled) return;

    if ((!openParent && event.key === 'ArrowDown') || event.key === 'ArrowUp') {
      onItemKeyDown(event, index);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      setOpenParent((prev) => !prev);
    } else if (openParent && event.key === 'ArrowDown') {
      handleOnChildKeyDown(event, childOffset - 1);
    }
  };

  if (item.children && item.children.length > 0 && 'values' in props) {
    return (
      <>
        <MenuItemWrapper
          style={{ paddingLeft: depth === 0 ? spacings.small : 0 }}
        >
          {spacers}
          <SmallButton
            variant="ghost_icon"
            onClick={handleChevronIconClick}
            data-testid="toggle-button"
            disabled={isItemDisabled}
          >
            <Icon
              color={colors.interactive.primary__resting.rgba}
              data={openParent ? chevron_down : chevron_right}
            />
          </SmallButton>
          <DynamicMenuItem
            menuItemProps={props}
            isSelected={isSelected}
            handleOnParentKeyDown={handleOnParentKeyDown}
          />
        </MenuItemWrapper>
        {openParent &&
          item.children.map((child, childIndex) => (
            <SelectMenuItem
              key={`child-${childIndex}-${child.value}-${item.value}`}
              index={childOffset + childIndex}
              childOffset={
                childOffset + getChildOffset(item.children!, childIndex)
              }
              depth={depth + 1}
              item={child}
              itemRefs={childRefs}
              values={props.values}
              onItemKeyDown={handleOnChildKeyDown}
              onItemSelect={onItemSelect}
              mode={mode}
              disabled={isItemDisabled}
              parentHasNestedItems
              CustomMenuItemComponent={CustomMenuItemComponent}
            />
          ))}
      </>
    );
  }

  if ('values' in props) {
    return (
      <MenuItemWrapper>
        {spacers}
        <DynamicMenuItem menuItemProps={props} isSelected={isSelected} />
      </MenuItemWrapper>
    );
  }
  return (
    <MenuItemWrapper>
      <DynamicMenuItem
        menuItemProps={props}
        isSelected={Boolean(props.value && item.value === props.value.value)}
      />
    </MenuItemWrapper>
  );
};
