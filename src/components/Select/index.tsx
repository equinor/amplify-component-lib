import MultiSelectDrawer from './MultiSelectDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';
export interface SelectItem {
  value: string;
  label: string;
  children?: SelectItem[];
}

export { SingleSelectDrawer, MultiSelectDrawer };
