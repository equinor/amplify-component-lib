import { T } from '@faker-js/faker/dist/airline-BcEu2nRk';

import { SelectOptionRequired } from 'src/molecules';
import { items } from 'src/molecules/OptionDrawer/stories/data';

export function autoCompleteMatches<T extends string>({
  options,
}: {
  options: Record<T, SelectOptionRequired[]>;
}) {
  return items.filter((item) =>
    getLabel(item).toLowerCase().includes(inputValue.toLowerCase())
  );
}
