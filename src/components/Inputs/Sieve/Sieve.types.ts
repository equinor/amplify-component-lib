import { FilterOption } from "./Filter";

type Option = {
  label: string;
  value: string;
};

type FilterValues = {
  [key: string]: Option[];
};

type SieveValue = {
  searchValue: string | undefined;
  sortValue: Option | undefined;
  filterValues: FilterValues | undefined;
};

interface SieveProps {
  searchPlaceholder: string;
  sortOptions?: Option[];
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

export type { FilterValues, Option,SieveProps, SieveValue };
