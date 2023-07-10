import { checkbox } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent, within } from '../../tests/test-utils';
import ChippedMultiSelect from './ChippedMultiSelect';

function mockedProps(items?: string[], values?: string[]) {
  return {
    label: faker.internet.ipv6(),
    placeholder: faker.internet.ipv6(),
    items:
      items ?? `${faker.internet.ipv6()}${faker.internet.ipv6()}`.split(':'),
    onSelect: vi.fn(),
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
  const fakedItems = `${faker.internet.ipv6()}${faker.internet.ipv6()}`.split(
    ':'
  );
  const firstItem = fakedItems[0];
  // First item is pre-selected
  const props = mockedProps(fakedItems, [firstItem]);
  const user = userEvent.setup();

  render(<ChippedMultiSelect {...props} />);

  const closeIcon = screen.getByRole('img', { name: /close/i });

  await user.click(closeIcon);

  // Since we just removed the first item by clicking the chip, we should expect an empty array back from the onSelect
  expect(props.onSelect).toHaveBeenCalledWith([]);
});

test('InDialog prop works as expected', async () => {
  const props = mockedProps();

  const { container } = render(<ChippedMultiSelect inDialog {...props} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const parent = container.parentElement as HTMLElement;
  const menu = parent.querySelector('#eds-menu-container > div');

  expect(menu).toHaveStyle('z-index: 1400;');
});

test('maxHeight prop works as expected', async () => {
  const props = mockedProps();

  const { container } = render(
    <ChippedMultiSelect maxHeight="18rem" {...props} />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const parent = container.parentElement as HTMLElement;
  const menu = parent.querySelector('#eds-menu-container > div');

  expect(menu).toHaveStyle('max-height: 18rem;');
});

test('Formatter prop works as expected in menu', async () => {
  const props = mockedProps();

  function fakeFormatter(str: string) {
    return str + `-formatted`;
  }

  render(<ChippedMultiSelect formatter={fakeFormatter} {...props} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const item of props.items) {
    expect(screen.getByText(fakeFormatter(item))).toBeInTheDocument();
  }
});

test('Formatter prop works as expected in chips', async () => {
  const props = mockedProps();

  function fakeFormatter(str: string) {
    return str + `-formatted`;
  }

  render(
    <ChippedMultiSelect
      formatter={fakeFormatter}
      {...props}
      values={[props.items[0]]}
    />
  );
  expect(screen.getByText(fakeFormatter(props.items[0]))).toBeInTheDocument();
});

test("MenuItems get correct styling when they're selected", async () => {
  const props = mockedProps();

  render(<ChippedMultiSelect {...props} values={[props.items[0]]} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const menuItem = screen.getByRole('menuitem', { name: props.items[0] });
  const icon = within(menuItem).getByTestId('eds-icon-path');
  expect(icon).toHaveAttribute('d', checkbox.svgPathData);
});

test('useOutSideClick works as expected', async () => {
  const props = mockedProps();

  render(<ChippedMultiSelect {...props} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const item of props.items) {
    expect(screen.getByText(item)).toBeInTheDocument();
  }

  await user.click(document.body);

  for (const item of props.items) {
    expect(screen.queryByText(item)).not.toBeInTheDocument();
  }
});
