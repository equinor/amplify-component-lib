import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../test-utils';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from './SingleSelectDrawer';

function fakeItem(): { id: string; label: string } {
  return {
    id: faker.datatype.uuid(),
    label: faker.lorem.words(faker.datatype.number({ min: 1, max: 5 })),
  };
}

function fakeProps(): SingleSelectDrawerProps<{
  id: string;
  label: string;
}> {
  const fakeItems: { id: string; label: string }[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    fakeItems.push(fakeItem());
  }
  return {
    items: fakeItems,
    label: faker.lorem.words(2),
    placeholder: faker.lorem.sentence(),
    onChange: vi.fn(),
    id: faker.datatype.uuid(),
    initialItem: undefined,
  };
}

test('Works as expected when opening and choosing an item', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<SingleSelectDrawer {...props} />);

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);

  const randomIndex = faker.datatype.number({
    min: 0,
    max: props.items.length - 1,
  });

  const randomItem = screen.getAllByRole('checkbox')[randomIndex];

  await user.click(randomItem);

  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenCalledWith(props.items[randomIndex]);
});
