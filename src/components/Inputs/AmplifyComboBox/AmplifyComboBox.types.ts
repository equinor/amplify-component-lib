import { KeyboardEvent, MutableRefObject } from 'react';

export type ComboBoxOption = {
  value: string;
  label: string;
};

interface AmplifySingleComboBoxCommon<T extends ComboBoxOption> {
  value: T | undefined;
  onSelect: (value: T | undefined) => void;
}

interface AmplifyMultiComboBoxCommon<T extends ComboBoxOption> {
  values: T[];
  onSelect: (values: T[], selectedValue: T) => void;
}

type AmplifyComboboxCommon<T extends ComboBoxOption> =
  | AmplifySingleComboBoxCommon<T>
  | AmplifyMultiComboBoxCommon<T>;

export type AmplifyGroupedComboboxProps<T extends ComboBoxOption> =
  AmplifyComboboxCommon<T> & {
    groups: Array<{ title: string; items: Array<T> }>;
  };

type OptionWithChildren = {
  children: Array<ComboBoxOption | OptionWithChildren>;
} & ComboBoxOption;

export type AmplifyComboBoxProps<
  T extends ComboBoxOption | OptionWithChildren,
> = AmplifyComboboxCommon<T> & {
  items: Array<T>;
  selectableParent?: boolean;
};

export interface AmplifyComboBoxMenuProps<T extends ComboBoxOption> {
  search: string;
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  onItemKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onItemSelect: (item: T) => void;
}
