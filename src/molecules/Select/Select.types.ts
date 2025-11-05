import { FC, KeyboardEvent, ReactNode, RefObject } from 'react';

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
  customValueComponent?: FC<{
    item: SelectOption<T>;
  }>;
}

interface MultiSelectBase<T extends SelectOptionRequired> {
  values: SelectOption<T>[];
  onSelect: (
    values: SelectOption<T>[],
    selectedValue?: SelectOption<T>
  ) => void;
  syncParentChildSelection?: boolean;
}

type MultiSelectWithSelectedAsText<T extends SelectOptionRequired> = {
  showSelectedAsText:
    | boolean
    | (({
        selectedAmount,
        totalAmount,
      }: {
        selectedAmount: number;
        totalAmount: number;
      }) => string);
} & MultiSelectBase<T>;

type MultiSelectWithCustomValueComponent<T extends SelectOptionRequired> = {
  showSelectedAsText?: undefined;
  customValueComponent?: FC<{
    item: SelectOption<T>;
    onDelete: () => void;
    tryingToRemove: boolean;
  }>;
} & MultiSelectBase<T>;

export type MultiSelectCommon<T extends SelectOptionRequired> =
  | MultiSelectWithSelectedAsText<T>
  | MultiSelectWithCustomValueComponent<T>;

export interface MenuModeSelectProps {
  mode?: 'menu';
}

export interface PersistentSelectProps {
  maxHeight?: string;
}

export interface PersistentModeSelectProps extends PersistentSelectProps {
  mode?: 'persistent';
}

export interface SelectGroup<T extends SelectOptionRequired> {
  title?: string;
  items: SelectOption<T>[];
}

export interface GroupedSelectProps<T extends SelectOptionRequired> {
  groups: SelectGroup<T>[];
  items?: undefined;
}

export type GroupedSelectPropsCombined<T extends SelectOptionRequired> =
  GroupedSelectProps<T> &
    SelectMenuProps<T> &
    CustomMenuItemComponentProps<T> &
    (MultiSelectCommon<T> | SingleSelectCommon<T>) &
    (PersistentModeSelectProps | MenuModeSelectProps);

type CommonListSelectProps<T extends SelectOptionRequired> = {
  items: SelectOption<T>[];
  groups?: undefined;
};

interface ListSelectWithAddItemProps<T extends SelectOptionRequired>
  extends CommonListSelectProps<T> {
  onAddItem: (item: string) => void;
  itemSingularWord?: string;
}

interface ListSelectWithoutAddItemProps<T extends SelectOptionRequired>
  extends CommonListSelectProps<T> {
  onAddItem?: undefined;
  itemSingularWord?: undefined;
}

export type ListSelectProps<T extends SelectOptionRequired> =
  | ListSelectWithAddItemProps<T>
  | ListSelectWithoutAddItemProps<T>;

export interface ListSelectMenuProps {
  onAddItem?: () => void;
  itemSingularWord?: string;
}

export type ListSelectMenuPropsCombined<T extends SelectOptionRequired> = Omit<
  ListSelectProps<T>,
  'onAddItem'
> &
  ListSelectMenuProps &
  SelectMenuProps<T> &
  CustomMenuItemComponentProps<T> &
  (PersistentModeSelectProps | MenuModeSelectProps) &
  (
    | Omit<MultiSelectCommon<T>, 'syncParentChildSelection'>
    | SingleSelectCommon<T>
  );

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
  isParentSelected?: boolean;
  parentHasNestedItems?: boolean;
  customMenuItemComponent?: FC<{
    item: SelectOption<T>;
    selected: boolean;
  }>;
}

export type SingleSelectMenuItemProps<T extends SelectOptionRequired> = {
  value: SelectOption<T> | undefined;
} & Omit<SelectMenuProps<T>, 'search'> &
  SelectMenuItemProps<T> &
  CustomMenuItemComponentProps<T> &
  (PersistentModeSelectProps | MenuModeSelectProps);

export type MultiSelectMenuItemProps<T extends SelectOptionRequired> = {
  values: SelectOption<T>[];
} & Omit<SelectMenuProps<T>, 'search'> &
  SelectMenuItemProps<T> &
  CustomMenuItemComponentProps<T> &
  (PersistentModeSelectProps | MenuModeSelectProps);

export const VARIANT_OPTIONS: Variants[] = [
  'success',
  'warning',
  'error',
  'dirty',
] as const;

export type SelectedState = 'selected' | 'indeterminate' | 'none';

export interface CustomMenuItemComponentProps<T extends SelectOptionRequired> {
  CustomMenuItemComponent?: FC<{
    item: SelectOption<T>;
    selectedState: SelectedState;
  }>;
}

export type CommonSelectProps<T extends SelectOptionRequired> = {
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
  meta?: ReactNode;
  onSearchChange?: (inputValue: string) => void;
  inDialog?: boolean;
  onOpenCallback?: (value: boolean) => void;
  onSearchFilter?: (searchValue: string, item: T) => void;
  'data-testid'?: string;
} & CustomMenuItemComponentProps<T>;
