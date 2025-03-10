import { faker } from '@faker-js/faker';

import { SortMenu } from 'src/organisms/Filter/SortMenu';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Calls onChange when selecting new sorting', async () => {
  const sortings = ['new', 'old', 'name'] as const;

  const value = faker.helpers.arrayElement(sortings);
  const onChange = vi.fn();
  const items = sortings.map((sorting) => ({
    value: sorting,
    label: sorting,
  }));

  render(<SortMenu value={value} onChange={onChange} items={items} />);

  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));

  const randomItem = faker.helpers.arrayElement(items);

  await user.click(screen.getByRole('menuitem', { name: randomItem.label }));

  expect(onChange).toHaveBeenCalledWith(randomItem.value);
});
