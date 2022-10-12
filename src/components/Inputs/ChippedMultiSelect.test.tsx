import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../test-utils';
import ChippedMultiSelect from './ChippedMultiSelect';

function mockedProps(items?: string[], values?: string[]) {
  return {
    label: faker.internet.ipv6(),
    placeholder: faker.internet.ipv6(),
    items:
      items ?? `${faker.internet.ipv6()}${faker.internet.ipv6()}`.split(':'),
    onSelect: jest.fn(),
    values: values ?? [],
  };
}

test('Runs onSelect with props as expected', async () => {
  const props = mockedProps();
  const user = userEvent.setup();

  render(<ChippedMultiSelect {...props} />);

  const combobox = screen.getByRole('combobox');
  await user.click(combobox);

  const itemNumber = Math.floor(Math.random() * props.items.length);
  await user.click(screen.getByText(props.items[itemNumber]));

  expect(props.onSelect).toHaveBeenCalledWith([props.items[itemNumber]]);
});

test('Remove item when clicking the chip', async () => {
  const fackedItems = `${faker.internet.ipv6()}${faker.internet.ipv6()}`.split(
    ':'
  );
  const firstItem = fackedItems[0];
  // First item is pre-selected
  const props = mockedProps(fackedItems, [firstItem]);
  const user = userEvent.setup();

  render(<ChippedMultiSelect {...props} />);

  const closeIcon = screen.getByRole('img', { name: /close/i });

  await user.click(closeIcon);

  // Since we just removed the first item by clicking the chip, we should expect an empty array back from the onSelect
  expect(props.onSelect).toHaveBeenCalledWith([]);
});
