import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import MultiSelectDrawer, { MultiSelectDrawerProps } from './MultiSelectDrawer';

type FakeType = {
  id: string;
  label: string;
  children?: FakeType[];
};
function fakeItem(): FakeType {
  return {
    id: faker.datatype.uuid(),
    label: faker.datatype.uuid(),
  };
}

function fakeChildren(): FakeType[] {
  const children: FakeType[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 5 }); i++) {
    children.push(fakeItem());
  }
  return children;
}

function fakeProps(): MultiSelectDrawerProps<FakeType> {
  const fakeItems: FakeType[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    fakeItems.push(fakeItem());
  }

  const randomItem = faker.datatype.number({
    min: 1,
    max: fakeItems.length - 1,
  });

  fakeItems[0].children = fakeChildren(); // Need to test search specifically for item with children
  fakeItems[randomItem].children = fakeChildren();

  return {
    items: fakeItems,
    label: faker.lorem.words(2),
    placeholder: faker.lorem.sentence(),
    onChange: vi.fn(),
    id: faker.datatype.uuid(),
    selectedItems: [],
  };
}

test('Works as expected when opening and toggling an item', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const { rerender } = render(<MultiSelectDrawer {...props} />);

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
  expect(props.onChange).toHaveBeenCalledWith([props.items[randomIndex]]);

  rerender(
    <MultiSelectDrawer {...props} selectedItems={[props.items[randomIndex]]} />
  );

  await user.click(randomItem);
  expect(props.onChange).toHaveBeenCalledTimes(2);
  expect(props.onChange).toHaveBeenCalledWith([]);
});

test('Works as expected when clicking outside component when open', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<MultiSelectDrawer {...props} />);

  const randomIndex = faker.datatype.number({
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
  render(<MultiSelectDrawer {...props} />);

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });
  await user.click(toggleOptions);

  const input = screen.getByPlaceholderText(props.placeholder ?? '');

  const searchParam = props.items[0].label;

  await user.type(input, searchParam);

  const hiddenItems = props.items.filter((item) => item.label !== searchParam);

  expect(screen.getByText(searchParam)).toBeInTheDocument();

  hiddenItems.forEach((item) => {
    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  });

  await user.click(screen.getByRole('button', { name: 'close search' }));

  hiddenItems.forEach((item) => {
    expect(screen.queryByText(item.label)).toBeInTheDocument();
  });
});
