import { SieveFilterGroup } from './Filter';

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
  filterOptions?: SieveFilterGroup[];
  sieveValue: SieveValue;
  onUpdate: (value: SieveValue) => void;
  showChips?: boolean;
  minSearchWidth?: string;
  debounceSearchValue?: boolean;
  onIsTyping?: (value: boolean) => void;
}

export type { FilterValues, SieveOption, SieveProps, SieveValue };
