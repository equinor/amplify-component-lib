import { FC, KeyboardEvent, RefObject } from 'react';

import { Variants } from 'src/atoms/types/variants';

export interface SelectOptionRequired {
  value: string;
  label: string;
}

export type SelectOption<T extends SelectOptionRequired> = T & {
  children?: T[];
};

export interface SingleSelectCommon<T extends SelectOptionRequired> {
  value: SelectOption<T> | undefined;
  onSelect: (value: SelectOption<T> | undefined) => void;
}

export interface MultiSelectCommon<T extends SelectOptionRequired> {
  values: SelectOption<T>[];
  onSelect: (
    values: SelectOption<T>[],
    selectedValue?: SelectOption<T>
  ) => void;
  syncParentChildSelection?: boolean;
  onAddItem?: (item: string) => void;
  customValueComponent?: FC<{
    item: SelectOption<T>;
    onDelete: () => void;
    tryingToRemove: boolean;
  }>;
}

export interface SelectGroup<T extends SelectOptionRequired> {
  title: string;
  items: SelectOption<T>[];
}

export interface GroupedSelectProps<T extends SelectOptionRequired> {
  groups: SelectGroup<T>[];
  items?: undefined;
}

export interface ListSelectProps<T extends SelectOptionRequired> {
  items: SelectOption<T>[];
  groups?: undefined;
}

export interface ListSelectMenuProps {
  onAddItem?: () => void;
}

export interface SelectMenuProps<T extends SelectOptionRequired> {
  search: string;
  itemRefs: RefObject<(HTMLButtonElement | null)[]>;
  onItemKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onItemSelect: (item: SelectOption<T>) => void;
  onSearchFilter?: (searchValue: string, item: T) => void;
}

interface SelectMenuItemProps<T extends SelectOptionRequired> {
  item: SelectOption<T>;
  index: number;
  childOffset: number;
  depth?: number;
}

export type SingleSelectMenuItemProps<T extends SelectOptionRequired> = {
  multiselect?: undefined;
  isParentSelected?: boolean;
  parentHasNestedItems?: boolean;
} & Omit<SelectMenuProps<T>, 'search'> &
  SelectMenuItemProps<T> &
  Pick<SingleSelectCommon<T>, 'value'>;

export type MultiSelectMenuItemProps<T extends SelectOptionRequired> = {
  isParentSelected?: boolean;
  parentHasNestedItems?: boolean;
  multiselect: true;
  values: SelectOption<T>[];
} & Omit<SelectMenuProps<T>, 'search'> &
  SelectMenuItemProps<T>;

export const VARIANT_OPTIONS: Variants[] = [
  'success',
  'warning',
  'error',
  'dirty',
] as const;

export interface CommonSelectProps<T extends SelectOptionRequired> {
  id?: string;
  variant?: Variants;
  label?: string;
  helperText?: string;
  showHelperIcon?: boolean;
  placeholder?: string;
  sortValues?: boolean;
  disabled?: boolean;
  loading?: boolean;
  lightBackground?: boolean;
  underlineHighlight?: boolean;
  clearable?: boolean;
  meta?: string;
  onSearchChange?: (inputValue: string) => void;
  inDialog?: boolean;
  onOpenCallback?: (value: boolean) => void;
  onSearchFilter?: (searchValue: string, item: T) => void;
  'data-testid'?: string;
}
