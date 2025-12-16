import { FormEvent } from 'react';

import { error_outlined } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Select } from './Select';
import { SelectOptionRequired } from './Select.types';
import { getCumulativeArrayFromNumberedArray } from './Select.utils';
import {
  fakeSelectItem,
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

export function fakeGroups(count = 5, isParented?: boolean) {
  return new Array(count)
    .fill(0)
    .map(() => ({
      title: faker.animal.cow(),
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

test('Searching works as expected with onSearchFilter', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();
  const itemToHideInSearch = faker.helpers.arrayElement(items.slice(0, 3));
  const randomItemToShowInSearch = faker.helpers.arrayElement(
    items.slice(4, 8)
  );

  const handleOnSearchFilter = (
    searchValue: string,
    item: SelectOptionRequired
  ) => {
    if (item.label === itemToHideInSearch.label) return false;
    const regexPattern = new RegExp(searchValue, 'i');
    return item.label.match(regexPattern);
  };

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
      onSearchFilter={handleOnSearchFilter}
    />
  );

  const searchField = screen.getByRole('combobox');

  const user = userEvent.setup();

  // Expect a "normal" item to be shown in search results
  await user.type(searchField, randomItemToShowInSearch.label);

  expect(searchField).toHaveValue(randomItemToShowInSearch.label);
  expect(
    screen.queryByText(randomItemToShowInSearch.label)
  ).toBeInTheDocument();

  await user.clear(searchField);

  // Expect a item hidden by custom onSearchFilter not to be shown in search results
  await user.type(searchField, itemToHideInSearch.label);

  expect(searchField).toHaveValue(itemToHideInSearch.label);
  expect(
    screen.queryByText(randomItemToShowInSearch.label)
  ).not.toBeInTheDocument();
});

test('Searching works as expected with groups and onSearchFilter', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups();
  const itemToHideInSearch = faker.helpers.arrayElement(groups[0].items);
  const randomItemToShowInSearch = faker.helpers.arrayElement(groups[1].items);

  const handleOnSearchFilter = (
    searchValue: string,
    item: SelectOptionRequired
  ) => {
    if (item.label === itemToHideInSearch.label) return false;
    const regexPattern = new RegExp(searchValue, 'i');
    return item.label.match(regexPattern);
  };

  render(
    <Select
      label={label}
      onSelect={handler}
      groups={groups}
      value={undefined}
      onSearchFilter={handleOnSearchFilter}
    />
  );

  const searchField = screen.getByRole('combobox');

  const user = userEvent.setup();

  // Expect a "normal" item to be shown in search results
  await user.type(searchField, randomItemToShowInSearch.label);

  expect(searchField).toHaveValue(randomItemToShowInSearch.label);
  expect(
    screen.queryByText(randomItemToShowInSearch.label)
  ).toBeInTheDocument();

  await user.clear(searchField);

  // Expect a item hidden by custom onSearchFilter not to be shown in search results
  await user.type(searchField, itemToHideInSearch.label);

  expect(searchField).toHaveValue(itemToHideInSearch.label);
  expect(
    screen.queryByText(randomItemToShowInSearch.label)
  ).not.toBeInTheDocument();
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
  const helperText = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeSelectItems();

  render(
    <Select
      label={label}
      helperText={helperText}
      showHelperIcon={false}
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

test('Able to hide helperIcon', () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
      variant="error"
      showHelperIcon={false}
    />
  );

  const edsIcons = screen.getAllByTestId('eds-icon-path');

  for (const icon of edsIcons) {
    expect(icon).not.toHaveAttribute('d', error_outlined.svgPathData);
  }
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

  await user.click(screen.getByRole('combobox'));

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

  await user.click(screen.getByRole('combobox'));

  expect(openCallback).toHaveBeenCalledWith(true);

  await user.click(screen.getByRole('combobox'));

  expect(openCallback).toHaveBeenCalledWith(false);

  // Open and click outside
  await user.click(screen.getByRole('combobox'));
  await user.click(screen.getByText(outside));

  expect(openCallback).toHaveBeenCalledWith(false);
});

test('Does not call onSubmit when clicking items', async () => {
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  const placeholder = faker.airline.airplane().name;
  const handleOnSubmit = vi.fn((e: FormEvent) => e.preventDefault());

  render(
    <form onSubmit={handleOnSubmit}>
      <Select
        placeholder={placeholder}
        inDialog
        onSelect={handleOnSelect}
        items={items}
        value={undefined}
      />
    </form>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  await user.click(screen.getByText(items[0].label));

  expect(handleOnSelect).toHaveBeenCalledWith(items[0]);
  expect(handleOnSubmit).not.toHaveBeenCalled();
});

test('Does not call onSubmit when selecting items with {Enter}', async () => {
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  const placeholder = faker.airline.airplane().name;
  const handleOnSubmit = vi.fn((e: FormEvent) => e.preventDefault());

  render(
    <form onSubmit={handleOnSubmit}>
      <Select
        placeholder={placeholder}
        inDialog
        onSelect={handleOnSelect}
        items={items}
        value={undefined}
      />
    </form>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(handleOnSelect).toHaveBeenCalledWith(items[0]);
  expect(handleOnSubmit).not.toHaveBeenCalled();
});

test('Passing "data-testid" attribute works as expected', () => {
  const handler = vi.fn();
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const id = faker.string.uuid();
  const randomTestId = faker.animal.dog();

  render(
    <Select
      id={id}
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      data-testid={randomTestId}
    />
  );

  expect(screen.getByTestId(randomTestId)).toBeInTheDocument();
});

test("Shows 'no items' text even if we have onAddItem but the search is empty", async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const handleOnAdd = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      onAddItem={handleOnAdd}
      items={[]}
      value={undefined}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));

  expect(screen.getByText('No items found')).toBeInTheDocument();
});

test('Shows expected word for item when providing prop', async () => {
  const label = faker.animal.bear();
  const word = faker.commerce.product();
  const handler = vi.fn();
  const handleOnAdd = vi.fn();
  const items = fakeSelectItems();

  render(
    <Select
      label={label}
      onSelect={handler}
      onAddItem={handleOnAdd}
      itemSingularWord={word}
      items={items}
      value={undefined}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));

  await user.type(screen.getByRole('combobox'), 'test');

  expect(screen.getByText(`Add ${word}`)).toBeInTheDocument();
  expect(screen.getByText(`Add "test" as new ${word}`)).toBeInTheDocument();
  expect(screen.getByText(`${word} search results`)).toBeInTheDocument();
  expect(screen.getByText(`No ${word} for "test" found.`)).toBeInTheDocument();
});

test('Throws error when trying to use SingleSelect with persistent mode and groups', () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups(3);

  // Suppress console.error for this test since we expect an error to be thrown
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    render(
      <Select
        label={label}
        onSelect={handler}
        groups={groups}
        value={undefined} // Using 'value' (SingleSelect) instead of 'values' (PersistentComboBox)
        mode="persistent"
      />
    );
  }).toThrow('You cannot use SingleSelect with persistent mode');

  consoleSpy.mockRestore();
});
