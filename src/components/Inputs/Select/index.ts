import MultiSelectDrawer from './MultiSelectDrawer';
import MultiSelectDrawerWithValidation from './MultiSelectDrawerWithValidation';
import OptionDrawer from './OptionDrawer';
import SimpleMultiSelectDrawer from './SimpleMultiSelectDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';
import SingleSelectDrawerWithValidation from './SingleSelectDrawerWithValidation';

export {
  MultiSelectDrawer,
  MultiSelectDrawerWithValidation,
  OptionDrawer,
  SimpleMultiSelectDrawer,
  SingleSelectDrawer,
  SingleSelectDrawerWithValidation,
};

type SelectItem<T> = {
  object: T;
  id: string;
  label: string;
  children: SelectItem<T>[];
};

export type { SelectItem };
