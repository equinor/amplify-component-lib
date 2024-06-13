import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from './SingleSelectDrawer';

function fakeItem(): { id: string; label: string } {
  return {
    id: faker.string.uuid(),
    label: faker.lorem.words(faker.number.int({ min: 1, max: 5 })),
  };
}

function fakeProps(): SingleSelectDrawerProps<{
  id: string;
  label: string;
}> {
  const fakeItems: { id: string; label: string }[] = [];

  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
    fakeItems.push(fakeItem());
  }
  return {
    items: fakeItems,
    label: faker.lorem.words(2),
    placeholder: faker.lorem.sentence(),
    onChange: vi.fn(),
    id: faker.string.uuid(),
    initialItem: undefined,
  };
}

test('Works as expected when opening and toggling an item', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<SingleSelectDrawer {...props} />);

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);

  const randomIndex = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });

  const randomItem = screen.getAllByRole('checkbox')[randomIndex];

  await user.click(randomItem);
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenCalledWith(props.items[randomIndex]);

  await user.click(randomItem);
  expect(props.onChange).toHaveBeenCalledTimes(2);
  expect(props.onChange).toHaveBeenCalledWith(undefined);
});

test('Works as expected when clicking outside component when open', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<SingleSelectDrawer {...props} />);

  const randomIndex = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);

  expect(
    screen.queryByText(props.items[randomIndex].label)
  ).toBeInTheDocument();

  await user.click(document.body);

  expect(
    screen.queryByText(props.items[randomIndex].label)
  ).not.toBeInTheDocument();
});

test('Works as expected when entering search param in input field', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<SingleSelectDrawer {...props} />);

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });
  await user.click(toggleOptions);

  const input = screen.getByPlaceholderText(props.placeholder ?? '');

  const randomIndex = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });

  const searchParam = props.items[randomIndex].label;

  await user.type(input, searchParam);

  const hiddenItems = props.items.filter((item) => item.label !== searchParam);

  expect(screen.getByText(searchParam)).toBeInTheDocument();

  hiddenItems.forEach((item) => {
    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  });
});

test('Works as expected when tabbing to focus the input', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<SingleSelectDrawer {...props} />);

  const input = screen.getByPlaceholderText(props.placeholder ?? '');

  const randomIndex = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });

  // We know that the first tab focuses the input field in this component
  await user.tab();

  expect(input).toHaveFocus();
  expect(
    screen.queryByText(props.items[randomIndex].label)
  ).toBeInTheDocument();
});

test('Works as expected when passing an initialItem prop', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const randomIndex = faker.number.int({
    min: 0,
    max: props.items.length - 1,
  });
  const initialItem = props.items[randomIndex];

  render(<SingleSelectDrawer {...props} initialItem={initialItem} />);

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);

  const initialItemInput = screen.getByText(initialItem.label).children[0]
    .children[0];

  expect(initialItemInput).toBeChecked();
});
