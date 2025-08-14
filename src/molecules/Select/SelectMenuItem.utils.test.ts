import { checkbox, checkbox_indeterminate } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import {
  SelectOption,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';
import { getParentIcon } from 'src/molecules/Select/SelectMenuItem.utils';

test('Returns expected parent icon', async () => {
  const item: SelectOption<SelectOptionRequired> = {
    label: faker.animal.dog(),
    value: faker.string.uuid(),
    children: [
      {
        label: faker.animal.cat(),
        value: faker.string.uuid(),
      },
    ],
  };

  const selectedParentIcon = getParentIcon(item, [item]);

  expect(selectedParentIcon.name).toBe(checkbox.name);

  const selectedChildIcon = getParentIcon(item, [item.children![0]]);

  expect(selectedChildIcon.name).toBe(checkbox_indeterminate.name);
});
