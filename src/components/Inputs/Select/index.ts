import MultiSelectDrawer from './MultiSelectDrawer';
import OptionDrawer from './OptionDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';

export { MultiSelectDrawer, OptionDrawer, SingleSelectDrawer };

type SelectItem<T> = {
  object: T;
  id: string;
  label: string;
  children: SelectItem<T>[];
};

export type { SelectItem };
