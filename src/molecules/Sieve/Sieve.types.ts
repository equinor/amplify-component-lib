import { FilterOption } from 'src/molecules/Sieve/Filter';

interface SieveOption {
  label: string;
  value: string;
}

type FilterValues = Record<string, SieveOption[]>;

interface SieveValue {
  searchValue: string | undefined;
  sortValue: SieveOption | undefined;
  filterValues: FilterValues | undefined;
}

interface SieveProps {
  searchPlaceholder: string;
  sortOptions?: SieveOption[];
  filterOptions?: FilterOption[];
  sieveValue: SieveValue;
  onUpdate: (value: SieveValue) => void;
  showChips?: boolean;
  minSearchWidth?: string;
  syncWithSearchParams?: boolean;
  isLoadingOptions?: boolean;
  debounceSearchValue?: boolean;
  onIsTyping?: (value: boolean) => void;
}

export type { FilterValues, SieveOption, SieveProps, SieveValue };
