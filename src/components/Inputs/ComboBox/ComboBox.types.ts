import { KeyboardEvent, MutableRefObject } from 'react';

type ComboBoxOptionWithoutChildren<T> = {
  value: string;
  label: string;
} & T;

export interface ComboBoxOption<T = { value: string; label: string }> {
  value: string;
  label: string;
  children?: ComboBoxOptionWithoutChildren<T>[];
}

interface SingleComboBoxCommon<T extends ComboBoxOption<T>> {
  value: T | undefined;
  onSelect: (value: T | undefined) => void;
}

export interface MultiComboBoxCommon<T extends ComboBoxOption<T>> {
  values: T[];
  onSelect: (values: T[], selectedValue?: T) => void;
  selectableParent?: boolean;
}

type AmplifyComboboxCommon<T extends ComboBoxOption<T>> =
  | SingleComboBoxCommon<T>
  | MultiComboBoxCommon<T>;

export type GroupedComboboxProps<T extends ComboBoxOption<T>> =
  AmplifyComboboxCommon<T> & {
    groups: { title: string; items: T[] }[];
  };

export type ComboBoxProps<T extends ComboBoxOption<T>> =
  AmplifyComboboxCommon<T> & {
    items: T[];
  };

export interface ComboBoxMenuProps<T extends ComboBoxOption<T>> {
  search: string;
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  onItemKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onItemSelect: (item: T) => void;
  selectableParent?: boolean;
}

interface ComboBoxMenuItemProps<T> {
  item: T;
  index: number;
  childOffset: number;
  depth?: number;
}

export type ComboBoxSingleSelectMenuItemProps<T extends ComboBoxOption<T>> = {
  multiselect?: undefined;
} & Omit<ComboBoxMenuProps<T>, 'search'> &
  ComboBoxMenuItemProps<T>;
export type ComboBoxMultiSelectMenuItemProps<T extends ComboBoxOption<T>> = {
  multiselect: true;
  values: T[];
} & Omit<ComboBoxMenuProps<T>, 'search'> &
  ComboBoxMenuItemProps<T>;
