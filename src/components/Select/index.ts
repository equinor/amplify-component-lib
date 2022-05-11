import MultiSelectDrawer from './MultiSelectDrawer';
import OptionDrawer from './OptionDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';

export { SingleSelectDrawer, MultiSelectDrawer, OptionDrawer };

type SelectItem<T> = {
  value: T;
  label: string;
  items: SelectItem<T>[];
};

export type { SelectItem };
