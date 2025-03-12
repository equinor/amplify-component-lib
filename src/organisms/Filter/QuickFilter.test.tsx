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
  render(
    <QuickFilter values={{}} items={items} onQuickFilter={onQuickFilter} />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));

  const key = Object.keys(items)[0];
  const randomItem = faker.helpers.arrayElement(items[key]);

  await user.click(screen.getByRole('menuitem', { name: randomItem.label }));

  expect(onQuickFilter).toHaveBeenCalledWith(key, randomItem);
});

test('Sets active like expected', async () => {
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

  const key = Object.keys(items)[0];
  const onQuickFilter = vi.fn();
  render(
    <QuickFilter
      values={{
        [key]: [items[key][0]],
      }}
      items={items}
      onQuickFilter={onQuickFilter}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));

  const item = items[key][0];
  await user.click(screen.getByRole('menuitem', { name: item.label }));

  expect(onQuickFilter).toHaveBeenCalledWith(key, item);
});
