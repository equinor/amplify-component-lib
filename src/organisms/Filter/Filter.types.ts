import { ChangeEvent, ReactNode } from 'react';

import { IconData } from '@equinor/eds-icons';

export interface CommonFilterProps<T> {
  values: { key: T; label: string; icon?: IconData }[];
  onClearFilter: (key: T) => void;
  onClearAllFilters: () => void;
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchEnter: (value: string) => void;
  children: ReactNode | ReactNode[];
  initialOpen?: boolean;
  placeholder?: string;
  id?: string;
  showClearFiltersButton?: boolean;
}

export interface SortingProps<S> {
  sortValue: S;
  onSortChange: (value: S) => void;
  sortItems: { value: S; label: string }[];
}

type FilterWithSortingProps<T, S> = CommonFilterProps<T> & SortingProps<S>;

export interface QuickFilterProps<Q> {
  onQuickFilter: (value: Q) => void;
  quickFilterItems: { value: Q; label: string }[];
}

type FilterWithQuickFilterProps<T, Q> = CommonFilterProps<T> &
  QuickFilterProps<Q>;

export type FilterProps<T, S, Q> =
  | CommonFilterProps<T>
  | FilterWithSortingProps<T, S>
  | FilterWithQuickFilterProps<T, Q>
  | (FilterWithSortingProps<T, S> & FilterWithQuickFilterProps<T, Q>);
