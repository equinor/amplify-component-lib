import { faker } from '@faker-js/faker';

import { QuickFilter } from 'src/organisms/Filter/QuickFilter';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Calls onQuickFilter when selecting value', async () => {
  const items = {
    [faker.lorem.word()]: new Array(faker.number.int({ min: 1, max: 5 }))
      .fill(0)
      .map(() => {
        return {
          value: faker.string.uuid(),
          label: faker.string.uuid(),
        };
      }),
  };
  const onQuickFilter = vi.fn();
  render(<QuickFilter items={items} onQuickFilter={onQuickFilter} />);

  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));

  const key = Object.keys(items)[0];
  const randomItem = faker.helpers.arrayElement(items[key]);

  await user.click(screen.getByRole('menuitem', { name: randomItem.label }));

  expect(onQuickFilter).toHaveBeenCalledWith(key, randomItem);
});
