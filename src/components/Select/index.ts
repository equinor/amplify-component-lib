import MultiSelectDrawer from './MultiSelectDrawer';
import OptionDrawer from './OptionDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';

export { SingleSelectDrawer, MultiSelectDrawer, OptionDrawer };

type SelectItem = {
  value: string;
  label: string;
  items: SelectItem[];
};

export type { SelectItem };
