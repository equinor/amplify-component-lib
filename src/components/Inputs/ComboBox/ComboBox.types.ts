import { KeyboardEvent, MutableRefObject } from 'react';

export interface ComboBoxOptionRequired {
  value: string;
  label: string;
}

export type ComboBoxOption<T extends ComboBoxOptionRequired> = T & {
  children?: T[];
};

interface SingleComboBoxCommon<T extends ComboBoxOptionRequired> {
  value: ComboBoxOption<T> | undefined;
  onSelect: (value: ComboBoxOption<T> | undefined) => void;
}

export interface MultiComboBoxCommon<T extends ComboBoxOptionRequired> {
  values: ComboBoxOption<T>[];
  onSelect: (
    values: ComboBoxOption<T>[],
    selectedValue?: ComboBoxOption<T>
  ) => void;
  selectableParent?: boolean;
}

type AmplifyComboboxCommon<T extends ComboBoxOptionRequired> =
  | SingleComboBoxCommon<T>
  | MultiComboBoxCommon<T>;

export type GroupedComboboxProps<T extends ComboBoxOptionRequired> =
  AmplifyComboboxCommon<T> & {
    groups: { title: string; items: ComboBoxOption<T>[] }[];
  };

export type ComboBoxProps<T extends ComboBoxOptionRequired> =
  AmplifyComboboxCommon<T> & {
    items: ComboBoxOption<T>[];
  };

export interface ComboBoxMenuProps<T extends ComboBoxOptionRequired> {
  search: string;
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  onItemKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onItemSelect: (item: ComboBoxOption<T>) => void;
  selectableParent?: boolean;
}

interface ComboBoxMenuItemProps<T extends ComboBoxOptionRequired> {
  item: ComboBoxOption<T>;
  index: number;
  childOffset: number;
  depth?: number;
}

export type ComboBoxSingleSelectMenuItemProps<
  T extends ComboBoxOptionRequired,
> = {
  multiselect?: undefined;
  isParentSelected?: boolean;
} & Omit<ComboBoxMenuProps<T>, 'search'> &
  ComboBoxMenuItemProps<T>;

export type ComboBoxMultiSelectMenuItemProps<T extends ComboBoxOptionRequired> =
  {
    isParentSelected?: boolean;
    multiselect: true;
    values: ComboBoxOption<T>[];
  } & Omit<ComboBoxMenuProps<T>, 'search'> &
    ComboBoxMenuItemProps<T>;
