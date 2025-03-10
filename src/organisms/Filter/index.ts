import { Filter as BaseFilter } from './Filter';
import { QuickFilter } from './QuickFilter';
import { SortMenu } from './SortMenu';

type FilterType = typeof BaseFilter & {
  QuickFilter: typeof QuickFilter;
  SortMenu: typeof SortMenu;
};

export const Filter = BaseFilter as FilterType;
Filter.QuickFilter = QuickFilter;
Filter.SortMenu = SortMenu;

export type { FilterType };
