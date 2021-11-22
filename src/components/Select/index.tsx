import SingleSelectDrawer from './SingleSelectDrawer';
import MultiSelectDrawer from './MultiSelectDrawer';
import OptionDrawer from './OptionDrawer';

export interface SelectItem {
  value: string;
  label: string;
  children?: SelectItem[];
}

export { SingleSelectDrawer, MultiSelectDrawer, OptionDrawer };
