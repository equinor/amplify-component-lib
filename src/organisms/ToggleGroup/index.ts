import { ToggleGroup as BaseToggleGroup } from './ToggleGroup';
import { ToggleGroupOption } from './ToggleGroupOption';

type ToggleGroupType = typeof BaseToggleGroup & {
  Option: typeof ToggleGroupOption;
};

export const ToggleGroup = BaseToggleGroup as ToggleGroupType;
ToggleGroup.Option = ToggleGroupOption;
