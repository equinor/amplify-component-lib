import { ChangeEvent, ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

import { SelectOptionRequired } from 'src/molecules/Select/Select.types';

interface CommonFilterProps<T extends string> {
  values: Record<T, Array<SelectOptionRequired & { icon?: IconData }>>;
  onClearFilter: (key: T, index: number) => void;
  onClearAllFilters: () => void;
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchEnter: (value: string) => void;
  children: ReactNode | ReactNode[];
  inlineContent?: ReactNode | ReactNode[];
  topContent?: ReactNode | ReactNode[];
  initialOpen?: boolean;
  placeholder?: string;
  id?: string;
}

export interface FilterWithAutoCompleteOptions<T extends string>
  extends CommonFilterProps<T> {
  autoCompleteOptions: Record<T, SelectOptionRequired[]>;
  onAutoComplete: (key: T, value: SelectOptionRequired) => void;
}

export type FilterProps<T extends string> =
  | CommonFilterProps<T>
  | FilterWithAutoCompleteOptions<T>;
