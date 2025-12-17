import { KeyboardEvent, MouseEvent, useMemo } from 'react';

import { checkbox, checkbox_outline } from '@equinor/eds-icons';

import { colors } from 'src/atoms';
import { Icon, SelectOptionRequired, Typography } from 'src/molecules';
import {
  PersistentListItem,
  StyledMenuItem,
} from 'src/molecules/Select/Select.styles';
import {
  MultiSelectMenuItemProps,
  SelectedState,
  SingleSelectMenuItemProps,
} from 'src/molecules/Select/Select.types';
import {
  getParentIcon,
  getParentState,
} from 'src/molecules/Select/SelectMenuItem.utils';

interface DynamicMenuItemProps<T extends SelectOptionRequired> {
  menuItemProps: SingleSelectMenuItemProps<T> | MultiSelectMenuItemProps<T>;
  isSelected: boolean;
  handleOnParentKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export const DynamicMenuItem = <T extends SelectOptionRequired>({
  menuItemProps,
  isSelected,
  handleOnParentKeyDown,
}: DynamicMenuItemProps<T>) => {
  const {
    index,
    depth = 0,
    item,
    itemRefs,
    onItemKeyDown,
    onItemSelect,
    CustomMenuItemComponent,
    mode,
  } = menuItemProps;

  let checkboxIcon = isSelected ? checkbox : checkbox_outline;
  let selectedState: SelectedState = isSelected ? 'selected' : 'none';
  if (item.children && item.children.length > 0 && 'values' in menuItemProps) {
    checkboxIcon = getParentIcon(item, menuItemProps.values);
    selectedState = getParentState(item, menuItemProps.values);
  }

  const handleOnItemClick = (e: MouseEvent) => {
    // Stop form submission
    e.preventDefault();
    onItemSelect(item);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (handleOnParentKeyDown !== undefined) {
      handleOnParentKeyDown(e);
    } else {
      onItemKeyDown(e);
    }
  };

  const itemContent = useMemo(() => {
    if (CustomMenuItemComponent) {
      return (
        <CustomMenuItemComponent item={item} selectedState={selectedState} />
      );
    }

    return (
      <>
        {'values' in menuItemProps && (
          <Icon
            color={colors.interactive.primary__resting.rgba}
            data={checkboxIcon}
          />
        )}
        <span>
          <Typography group="navigation" variant="menu_title">
            {item.label}
          </Typography>
        </span>
      </>
    );
  }, [
    CustomMenuItemComponent,
    checkboxIcon,
    item,
    menuItemProps,
    selectedState,
  ]);

  if (mode === 'persistent') {
    return (
      <PersistentListItem
        ref={(element: HTMLButtonElement | null) => {
          itemRefs.current[index] = element;
        }}
        onKeyDownCapture={handleOnKeyDown}
        onClick={handleOnItemClick}
      >
        {itemContent}
      </PersistentListItem>
    );
  }

  return (
    <StyledMenuItem
      $depth={depth}
      $selected={'value' in menuItemProps ? isSelected : undefined}
      $paddedLeft={
        menuItemProps.parentHasNestedItems && 'values' in menuItemProps
          ? menuItemProps.parentHasNestedItems
          : undefined
      }
      ref={(element: HTMLButtonElement | null) => {
        itemRefs.current[index] = element;
      }}
      index={index}
      closeMenuOnClick={'value' in menuItemProps}
      onKeyDownCapture={handleOnKeyDown}
      onClick={handleOnItemClick}
    >
      {itemContent}
    </StyledMenuItem>
  );
};
