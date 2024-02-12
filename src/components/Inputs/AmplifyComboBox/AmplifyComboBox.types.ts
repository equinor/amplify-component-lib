import { KeyboardEvent, MutableRefObject } from 'react';

type ComboBoxOptionWithoutChildren<T> = {
  value: string;
  label: string;
} & T;

export type ComboBoxOption<T> = {
  value: string;
  label: string;
  children?: Array<ComboBoxOptionWithoutChildren<T>>;
};

interface AmplifySingleComboBoxCommon<T extends ComboBoxOption<T>> {
  value: T | undefined;
  onSelect: (value: T | undefined) => void;
}

export interface AmplifyMultiComboBoxCommon<T extends ComboBoxOption<T>> {
  values: T[];
  onSelect: (values: T[], selectedValue: T) => void;
  selectableParent?: boolean;
}

type AmplifyComboboxCommon<T extends ComboBoxOption<T>> =
  | AmplifySingleComboBoxCommon<T>
  | AmplifyMultiComboBoxCommon<T>;

export type AmplifyGroupedComboboxProps<T extends ComboBoxOption<T>> =
  AmplifyComboboxCommon<T> & {
    groups: Array<{ title: string; items: Array<T> }>;
  };

export type AmplifyComboBoxProps<T extends ComboBoxOption<T>> =
  AmplifyComboboxCommon<T> & {
    items: Array<T>;
  };

export interface AmplifyComboBoxMenuProps<T extends ComboBoxOption<T>> {
  search: string;
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  onItemKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onItemSelect: (item: T) => void;
  selectableParent?: boolean;
}
