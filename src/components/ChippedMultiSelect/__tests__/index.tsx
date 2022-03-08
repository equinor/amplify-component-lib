import { act, render, screen } from '@testing-library/react';

import ChippedMultiSelect from '..';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

function mockedProps() {
  return {
    label: faker.internet.ipv6(),
    placeholder: faker.internet.ipv6(),
    items: `${faker.internet.ipv6()}${faker.internet.ipv6()}`.split(':'),
    onSelect: jest.fn(),
    values: [],
  };
}

test('Renders without crashing', () => {
  const props = mockedProps();
  render(<ChippedMultiSelect {...props} />);
});

test('Runs onSelect with props as expected', () => {
  const props = mockedProps();
  render(<ChippedMultiSelect {...props} />);
  const combobox = screen.getByRole('combobox');
  userEvent.click(combobox);
  const itemNumber = Math.floor(Math.random() * props.items.length);

  act(() => {
    userEvent.click(screen.getByText(props.items[itemNumber]));
  });

  expect(props.onSelect).toHaveBeenCalledWith([props.items[itemNumber]]);
});
