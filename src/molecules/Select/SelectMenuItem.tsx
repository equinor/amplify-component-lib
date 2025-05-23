import { KeyboardEvent, MouseEvent, useMemo, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import {
  checkbox,
  checkbox_outline,
  chevron_down,
  chevron_right,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { getChildOffset } from './Select.utils';
import { getParentIcon, getParentState } from './SelectMenuItem.utils';
import { spacings } from 'src/atoms/style/spacings';
import {
  MenuItemSpacer,
  MenuItemWrapper,
  SmallButton,
  StyledMenuItem,
} from 'src/molecules/Select/Select.styles';
import {
  MultiSelectMenuItemProps,
  SelectedState,
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
    parentHasNestedItems = false,
    CustomMenuItemComponent,
  } = props;
  const [openParent, setOpenParent] = useState(false);
  const focusingChildIndex = useRef<number>(-1);
  const childRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedValues =
    'values' in props ? props.values.map(({ value }) => value) : [];
  const isSelected = selectedValues.includes(item.value);

  const parentIcon = useMemo(() => {
    if ('value' in props) return checkbox_outline;

    return getParentIcon(item, props.values);
  }, [item, props]);

  const parentState: SelectedState = useMemo(() => {
    if ('value' in props) return 'none';

    return getParentState(item, props.values);
  }, [item, props]);

  const spacers = useMemo(
    () =>
      new Array(depth)
        .fill(0)
        .map((num, index) => <MenuItemSpacer key={`spacer-${num + index}`} />),
    [depth]
  );

  const handleOnItemClick = (event: MouseEvent) => {
    // Stop form submission
    event.preventDefault();
    onItemSelect(item);
  };

  const handleChevronIconClick = (event: MouseEvent) => {
    event.stopPropagation();
    setOpenParent((prev) => !prev);
  };

  const handleOnChildKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      focusingChildIndex.current += 1;
    } else if (event.key === 'ArrowUp') {
      focusingChildIndex.current -= 1;
    }

    if (focusingChildIndex.current <= -1) {
      // On first child and moving up
      itemRefs.current[index]?.focus();
      focusingChildIndex.current = -1;
    } else if (
      focusingChildIndex.current + childOffset ===
      childRefs.current.length
    ) {
      // Last child, move to next top level
      focusingChildIndex.current = -1;
      onItemKeyDown(event);
      setOpenParent(false);
    } else if (
      focusingChildIndex.current >= 0 &&
      focusingChildIndex.current < childRefs.current.length - childOffset
    ) {
      childRefs.current[focusingChildIndex.current + childOffset]?.focus();
    }
  };

  const handleOnParentKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((!openParent && event.key === 'ArrowDown') || event.key === 'ArrowUp') {
      onItemKeyDown(event);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      setOpenParent((prev) => !prev);
    } else if (
      openParent &&
      event.key === 'ArrowDown' &&
      focusingChildIndex.current === -1
    ) {
      focusingChildIndex.current = 0;
      childRefs.current[focusingChildIndex.current + childOffset]?.focus();
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
          >
            <Icon
              color={colors.interactive.primary__resting.rgba}
              data={openParent ? chevron_down : chevron_right}
            />
          </SmallButton>
          <StyledMenuItem
            $depth={depth}
            ref={(element: HTMLButtonElement | null) => {
              itemRefs.current[index] = element;
            }}
            index={index}
            closeMenuOnClick={false}
            onKeyDownCapture={handleOnParentKeyDown}
            onClick={handleOnItemClick}
          >
            {CustomMenuItemComponent ? (
              <CustomMenuItemComponent
                item={item}
                selectedState={parentState}
              />
            ) : (
              <>
                <Icon
                  color={colors.interactive.primary__resting.rgba}
                  data={parentIcon}
                />
                <span>{item.label}</span>
              </>
            )}
          </StyledMenuItem>
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
        <StyledMenuItem
          $depth={depth}
          $paddedLeft={parentHasNestedItems}
          ref={(element: HTMLButtonElement | null) => {
            itemRefs.current[index] = element;
          }}
          index={index}
          tabIndex={depth}
          closeMenuOnClick={false}
          onKeyDownCapture={onItemKeyDown}
          onClick={handleOnItemClick}
        >
          {CustomMenuItemComponent ? (
            <CustomMenuItemComponent
              item={item}
              selectedState={isSelected ? 'selected' : 'none'}
            />
          ) : (
            <>
              <Icon
                color={colors.interactive.primary__resting.rgba}
                data={isSelected ? checkbox : checkbox_outline}
              />
              <span>{item.label}</span>
            </>
          )}
        </StyledMenuItem>
      </MenuItemWrapper>
    );
  }
  return (
    <MenuItemWrapper>
      <StyledMenuItem
        $depth={depth}
        $selected={props.value && item.value === props.value.value}
        ref={(element: HTMLButtonElement | null) => {
          itemRefs.current[index] = element;
        }}
        index={index}
        onKeyDownCapture={onItemKeyDown}
        onClick={handleOnItemClick}
      >
        {CustomMenuItemComponent ? (
          <CustomMenuItemComponent
            item={item}
            selectedState={
              props.value && item.value === props.value.value
                ? 'selected'
                : 'none'
            }
          />
        ) : (
          <span>{item.label}</span>
        )}
      </StyledMenuItem>
    </MenuItemWrapper>
  );
};
