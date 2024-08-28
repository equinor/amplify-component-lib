import { faker } from '@faker-js/faker';

import { Select } from './Select';
import { VARIANT_OPTIONS } from './Select.types';
import { getCumulativeArrayFromNumberedArray } from './Select.utils';
import { colors } from 'src/atoms/style';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import {
  fakeSelectItem,
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/test-utils';

import { expect } from 'vitest';

export function fakeGroups(count = 5, isParented?: boolean) {
  return new Array(count)
    .fill(0)
    .map(() => ({
      title: faker.airline.airplane().name,
      items: isParented ? fakeItemsWithChildren() : fakeSelectItems(),
    }))
    .filter(
      (group, index, array) =>
        index === array.findIndex((item) => item.title === group.title)
    );
}

export function fakeItemsWithChildren(count = 5) {
  return structuredClone(
    new Array(count).fill(0).map(() => ({
      ...fakeSelectItem(),
      children: new Array(2).fill(0).map(() => ({ ...fakeSelectItem() })),
    }))
  );
}

test('Can open/close by clicking icon', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();
  render(
    <Select label={label} onSelect={handler} items={items} value={undefined} />
  );

  const user = userEvent.setup();

  const svgIcon = screen.getByTestId('eds-icon-path');

  await user.click(svgIcon);

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  await user.click(svgIcon);

  for (const item of items) {
    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  }
});

test('Searching works as expected', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  const { rerender } = render(
    <Select label={label} onSelect={handler} items={items} value={undefined} />
  );
  const user = userEvent.setup();

  const searchField = screen.getByRole('combobox');

  const randomItem = faker.helpers.arrayElement(items);

  // Check typing just 'space' at start doesn't do anything
  await user.type(searchField, ' ');

  expect(searchField).toHaveValue('');

  await user.type(searchField, randomItem.label);

  for (const item of items) {
    if (item.label === randomItem.label) continue;

    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  }

  await user.click(screen.getByRole('menuitem', { name: randomItem.label }));

  expect(handler).toHaveBeenCalledWith(randomItem);

  expect(searchField).toHaveValue('');

  for (const item of items) {
    if (item.label === randomItem.label) continue;
    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  }

  rerender(
    <Select label={label} onSelect={handler} items={items} value={randomItem} />
  );

  // Opens when typing again

  interface Item {
    label: string;
    value: string;
  }

  const nextRandom = items.at(
    items.findIndex((i) => i.value === randomItem.value) - 1
  ) as Item;

  await user.keyboard(nextRandom.label);

  expect(
    screen.getByRole('menuitem', { name: nextRandom.label })
  ).toBeInTheDocument();
});

test("Clicking 'x' on chip works as expected", async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const handler = vi.fn();

  const { rerender } = render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
    />
  );
  const user = userEvent.setup();

  const chip = screen.getByRole('img', { name: /close/i });

  await user.click(chip);
  expect(handler).toHaveBeenCalledWith([], items[0]);

  rerender(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
    />
  );

  await user.click(chip);

  expect(handler).toHaveBeenCalledWith([], items[0]);
});

test('Keyboard navigation works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems().slice(0, 2);
  const handler = vi.fn();

  render(
    <Select label={label} onSelect={handler} items={items} value={undefined} />
  );
  const user = userEvent.setup({ delay: 100 });

  const searchField = screen.getByRole('combobox');

  await user.click(searchField);

  for (const item of items) {
    expect(
      screen.getByRole('menuitem', { name: item.label })
    ).toBeInTheDocument();
  }

  await user.keyboard('{Escape}');

  for (const item of items) {
    expect(
      screen.queryByRole('menuitem', { name: item.label })
    ).not.toBeInTheDocument();
  }

  await user.click(searchField);
  await user.keyboard('{Enter}');

  for (const item of items) {
    expect(
      screen.getByRole('menuitem', { name: item.label })
    ).toBeInTheDocument();
  }

  // Selecting first item in the list
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(handler).toHaveBeenCalledWith(items[0]);

  // Going all the way down
  for (let i = 1; i < items.length; i++) {
    await user.keyboard('{ArrowDown}');
  }

  // Going up again
  for (let i = items.length - 2; i >= 0; i--) {
    await user.keyboard('{ArrowUp}');
  }

  // Going to search field again
  await user.keyboard('{ArrowUp}');
});

test('Placeholder prop works as expected', () => {
  const placeholder = faker.airline.airport().name;
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const handler = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      value={undefined}
      items={items}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});

test('Filtering with no results', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const handler = vi.fn();

  render(
    <Select label={label} onSelect={handler} value={undefined} items={items} />
  );
  const user = userEvent.setup();

  await user.type(screen.getByRole('combobox'), faker.animal.bird());

  expect(screen.getByText('No items found')).toBeInTheDocument();
});

test('Filtering with no results in groups', async () => {
  const label = faker.animal.bear();
  const groups = fakeGroups();
  const handler = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      value={undefined}
      groups={groups}
    />
  );
  const user = userEvent.setup();

  await user.type(screen.getByRole('combobox'), faker.animal.bird());

  expect(screen.getByText('No items found')).toBeInTheDocument();
});

test(
  'Keyboard navigation inside parent item',
  async () => {
    const label = faker.animal.bear();
    const items = fakeItemsWithChildren();
    const handler = vi.fn();

    render(
      <Select label={label} onSelect={handler} items={items} values={[]} />
    );
    const user = userEvent.setup({ delay: 100 });

    await user.click(screen.getByRole('combobox'));

    // Enter menu
    await user.keyboard('{ArrowDown}');

    // Go past and back
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');

    // Open / Close / Open first parent
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');

    await user.keyboard('{ArrowRight}');

    // Go to first child
    await user.keyboard('{ArrowDown}');

    // Selecting works
    await user.keyboard('{Enter}');
    expect(handler).toBeCalledWith(
      [items[0].children[0]],
      items[0].children[0]
    );

    // Move up/down on child element
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');

    // Move back to parent
    await user.keyboard('{ArrowUp}');

    // Move down on last child element
    await user.keyboard('{ArrowDown}');

    for (let i = 1; i < items[0].children.length; i++) {
      await user.keyboard('{ArrowDown}');
    }

    await user.keyboard('{ArrowDown}');

    for (const child of items[0].children) {
      expect(
        screen.queryByRole('menuitem', { name: child.label })
      ).not.toBeInTheDocument();
    }

    // Go back to search field
    await user.keyboard('{ArrowUp}');
    await user.keyboard('{ArrowUp}');

    await user.keyboard(items[0].label);

    expect(
      screen.queryByRole('menuitem', { name: items[1].label })
    ).not.toBeInTheDocument();
  },
  { timeout: 15000 }
);

test('Disabled works as expected', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
      disabled
    />
  );

  const user = userEvent.setup();

  const combobox = screen.getByRole('combobox');

  await user.type(combobox, items[0].label);
  await user.click(combobox);

  await user.click(screen.getByTestId('eds-icon-path'));

  for (const item of items) {
    expect(
      screen.queryByRole('menuitem', { name: item.label })
    ).not.toBeInTheDocument();
  }
});

test('Loading works as expected', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
      loading
    />
  );

  const user = userEvent.setup();

  const combobox = screen.getByRole('combobox');
  await user.click(combobox);

  await user.type(combobox, items[0].label);

  for (const item of items) {
    expect(
      screen.queryByRole('menuitem', { name: item.label })
    ).not.toBeInTheDocument();
  }

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('variants work as expected', () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <Select label={label} onSelect={handleOnSelect} values={[]} items={items} />
  );

  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'box-shadow',
    `inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba}`
  );

  rerender(
    <Select
      variant="dirty"
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
    />
  );

  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'box-shadow',
    `inset 0 -2px 0 0 ${VARIANT_COLORS.dirty}`
  );

  for (const variant of VARIANT_OPTIONS.filter((item) => item !== 'dirty')) {
    rerender(
      <Select
        label={label}
        onSelect={handleOnSelect}
        values={[]}
        variant={variant}
        items={items}
      />
    );

    expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
      'outline',
      `1px solid ${VARIANT_COLORS[variant]}`
    );
  }
});

test('lightBackground works as expected', () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <Select
      label={label}
      onSelect={handleOnSelect}
      items={items}
      values={[items[0]]}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    `${colors.ui.background__light.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyleRule(
    'background',
    `${colors.ui.background__default.rgba}!important`
  );

  rerender(
    <Select
      label={label}
      onSelect={handleOnSelect}
      items={items}
      values={[items[0]]}
      lightBackground={true}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    `${colors.ui.background__default.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyleRule(
    'background',
    `${colors.ui.background__light.rgba}!important`
  );
});

test('Not able to remove item when disabled/loading', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  const { rerender } = render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
      disabled
    />
  );
  const user = userEvent.setup();

  const chip = screen.getByRole('img', { name: /close/i });

  await user.click(chip);

  expect(handler).not.toHaveBeenCalled();

  rerender(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      loading
    />
  );

  await user.click(chip);

  expect(handler).not.toHaveBeenCalled();
});

test('Clearing works as expected', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  const { rerender } = render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      clearable
    />
  );

  const user = userEvent.setup();

  const clearButton = screen.getByTestId('clearBtn');

  await user.click(clearButton);

  expect(handler).toHaveBeenCalledWith(undefined);

  rerender(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0], items[1]]}
    />
  );

  await user.click(clearButton);

  expect(handler).toHaveBeenCalledWith([]);

  rerender(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      clearable={false}
    />
  );

  expect(screen.queryByTestId('clearBtn')).not.toBeInTheDocument();
});

test('Sets id when sending it', () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();
  const id = faker.string.uuid();

  render(
    <Select
      id={id}
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
    />
  );

  expect(screen.getByRole('combobox')).toHaveAttribute('id', id);
  expect(screen.getByText(label).parentElement).toHaveAttribute('for', id);
});

test('getCumulativeArrayFromNumberedArray returns cumulative values', () => {
  const numberedArray = [1, 2, 3, 4, 5];
  const expectedArray = [0, 1, 3, 6, 10];
  expect(getCumulativeArrayFromNumberedArray(numberedArray)).toEqual(
    expectedArray
  );
});

test('Chevron button works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren(1);
  const handler = vi.fn();

  items
    .at(0)
    ?.children.forEach((child) =>
      expect(screen.queryByText(child.label)).not.toBeInTheDocument()
    );

  render(<Select label={label} onSelect={handler} items={items} values={[]} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));
  await user.click(screen.getByTestId('toggle-button'));

  items
    .at(0)
    ?.children.forEach((child) =>
      expect(screen.queryByText(child.label)).toBeInTheDocument()
    );
});

test('onSearchChange to be called with value when typing in input field', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();
  const id = faker.string.uuid();
  const handleOnSearchChange = vi.fn();

  render(
    <Select
      id={id}
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      onSearchChange={handleOnSearchChange}
    />
  );

  const user = userEvent.setup();
  const searchField = screen.getByRole('combobox');
  await user.type(searchField, 'Test');
  expect(handleOnSearchChange).toHaveBeenCalledWith('Test');
});

test('inDialog works as expected', async () => {
  const handler = vi.fn();
  const items = fakeSelectItems();
  const placeholder = faker.airline.airplane().name;
  const outside = faker.vehicle.vehicle();

  render(
    <>
      <Select
        placeholder={placeholder}
        inDialog
        onSelect={handler}
        items={items}
        value={undefined}
      />
      <p>{outside}</p>
    </>
  );
  const user = userEvent.setup();

  await user.click(screen.getByText(placeholder));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  await user.click(screen.getByText(outside));

  for (const item of items) {
    expect(screen.queryByText(item.label)).not.toBeInTheDocument();
  }
});

test('openCallback works as expected', async () => {
  const handler = vi.fn();
  const items = fakeSelectItems();
  const placeholder = faker.airline.airplane().name;
  const outside = faker.vehicle.vehicle();
  const openCallback = vi.fn();

  render(
    <>
      <Select
        placeholder={placeholder}
        inDialog
        onSelect={handler}
        items={items}
        value={undefined}
        onOpenCallback={openCallback}
      />
      <p>{outside}</p>
    </>
  );
  const user = userEvent.setup();

  // Open
  await user.click(screen.getByText(placeholder));

  expect(openCallback).toHaveBeenCalledWith(true);

  // Close
  await user.click(screen.getByText(placeholder));

  expect(openCallback).toHaveBeenCalledWith(false);

  // Open and click outside
  await user.click(screen.getByText(placeholder));
  await user.click(screen.getByText(outside));

  expect(openCallback).toHaveBeenCalledWith(false);
});
