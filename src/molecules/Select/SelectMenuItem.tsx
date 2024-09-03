import { KeyboardEvent, MouseEvent, useMemo, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import {
  checkbox,
  checkbox_indeterminate,
  checkbox_outline,
  chevron_down,
  chevron_right,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  MenuItemSpacer,
  MenuItemWrapper,
  SmallButton,
  StyledMenuItem,
} from 'src/molecules/Select/Select.styles';
import {
  MultiSelectMenuItemProps,
  SelectOptionRequired,
  SingleSelectMenuItemProps,
} from 'src/molecules/Select/Select.types';
import {
  flattenOptions,
  getChildOffset,
} from 'src/molecules/Select/Select.utils';

const { colors } = tokens;

export const SelectMenuItem = <T extends SelectOptionRequired>(
  props: SingleSelectMenuItemProps<T> | MultiSelectMenuItemProps<T>
) => {
  const {
    index,
    childOffset,
    depth = 0,
    item,
    multiselect,
    itemRefs,
    onItemKeyDown,
    onMouseEnterItem,
    onItemSelect,
    selectableParent = true,
    parentHasNestedItems = false,
  } = props;
  const [openParent, setOpenParent] = useState(false);
  const focusingChildIndex = useRef<number>(-1);
  const childRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedValues =
    'values' in props ? props.values.map(({ value }) => value) : [];
  const isSelected = selectedValues.includes(item.value);

  const parentIcon = useMemo(() => {
    if (!multiselect || !item.children || item.children.length === 0)
      return checkbox_outline;

    if (isSelected) {
      return checkbox;
    } else if (
      [item, ...item.children].some((option) =>
        props.values.find((i) => i.value === option.value)
      )
    ) {
      return checkbox_indeterminate;
    }

    const selectedValues = props.values.map(({ value }) => value);
    const allOptions = flattenOptions([item])?.map(({ value }) => value);

    if (allOptions.some((option) => selectedValues.includes(option))) {
      return checkbox_indeterminate;
    }

    return checkbox_outline;
  }, [item, multiselect, props, isSelected]);

  const spacers = useMemo(
    () =>
      new Array(depth)
        .fill(0)
        .map((num, index) => <MenuItemSpacer key={`spacer-${num + index}`} />),
    [depth]
  );

  const handleOnItemClick = () => {
    onItemSelect(item);

    if (!multiselect) {
      setOpenParent((prev) => !prev);
      return;
    }

    const selectedValues = props.values.map(({ value }) => value);
    const willOpen = !selectedValues.includes(item.value);
    setOpenParent(willOpen);
  };

  const handleOnMouseEnter = () => {
    onMouseEnterItem(index);
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
    if (!openParent && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
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

  const handleOnMouseEnterChildItem = (index: number) => {
    focusingChildIndex.current = index;
    childRefs.current.at(index)?.focus();
  };

  if (item.children && item.children.length > 0 && multiselect) {
    return (
      <>
        <MenuItemWrapper>
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
            onMouseEnter={handleOnMouseEnter}
            onClick={handleOnItemClick}
          >
            <Icon
              color={
                selectableParent
                  ? colors.interactive.primary__resting.rgba
                  : colors.interactive.disabled__fill.rgba
              }
              data={parentIcon}
            />
            <span>{item.label}</span>
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
              multiselect
              item={child}
              itemRefs={childRefs}
              values={props.values}
              onItemKeyDown={handleOnChildKeyDown}
              onItemSelect={onItemSelect}
              onMouseEnterItem={handleOnMouseEnterChildItem}
              selectableParent={selectableParent}
              parentHasNestedItems
            />
          ))}
      </>
    );
  }

  if (multiselect) {
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
          onMouseEnter={handleOnMouseEnter}
        >
          <Icon
            color={colors.interactive.primary__resting.rgba}
            data={isSelected ? checkbox : checkbox_outline}
          />
          <span>{item.label}</span>
        </StyledMenuItem>
      </MenuItemWrapper>
    );
  }
  return (
    <MenuItemWrapper>
      <StyledMenuItem
        $depth={depth}
        ref={(element: HTMLButtonElement | null) => {
          itemRefs.current[index] = element;
        }}
        index={index}
        onKeyDownCapture={onItemKeyDown}
        onClick={handleOnItemClick}
        onMouseEnter={handleOnMouseEnter}
      >
        <span>{item.label}</span>
      </StyledMenuItem>
    </MenuItemWrapper>
  );
};
