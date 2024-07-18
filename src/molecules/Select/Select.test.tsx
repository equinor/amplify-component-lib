import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { Select } from './Select';
import { VARIANT_COLORS } from './Select.styles';
import { VARIANT_OPTIONS } from './Select.types';
import { getCumulativeArrayFromNumberedArray } from './Select.utils';
import {
  fakeSelectItem,
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/test-utils';

import { expect } from 'vitest';

const { colors } = tokens;

function fakeGroups(count = 5, isParented?: boolean) {
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

function fakeItemsWithChildren(count = 5) {
  return new Array(count).fill(0).map(() => ({
    ...fakeSelectItem(),
    children: new Array(2).fill(0).map(() => ({ ...fakeSelectItem() })),
  }));
}

test('Basic single select', async () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const meta = faker.animal.insect();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <Select
      label={label}
      meta={meta}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
    />
  );
  const user = userEvent.setup();

  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByText(meta)).toBeInTheDocument();

  await user.click(screen.getByRole('combobox'));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  const randomItem = faker.helpers.arrayElement(items);

  await user.click(screen.getByText(randomItem.label));

  expect(handleOnSelect).toHaveBeenCalledTimes(1);
  expect(handleOnSelect).toHaveBeenCalledWith(randomItem);

  rerender(
    <Select
      label={label}
      meta={meta}
      onSelect={handleOnSelect}
      value={randomItem}
      items={items}
    />
  );
});

test('Basic single select with only meta label', () => {
  const items = fakeSelectItems();
  const meta = faker.animal.insect();
  const handleOnSelect = vi.fn();
  render(
    <Select
      meta={meta}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
    />
  );

  expect(screen.getByText(meta)).toBeInTheDocument();
});

test('Basic multi select', async () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  render(
    <Select label={label} onSelect={handleOnSelect} values={[]} items={items} />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  const randomItems = faker.helpers.arrayElements(items);

  for (const item of randomItems) {
    await user.click(screen.getByText(item.label));
    expect(handleOnSelect).toHaveBeenCalledWith([item], item);
  }

  expect(handleOnSelect).toHaveBeenCalledTimes(randomItems.length);
});

test('Parent multi select with selectableParent = false', async () => {
  const items = fakeItemsWithChildren();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
      selectableParent={false}
    />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  const randomItem = faker.helpers.arrayElement(items);

  await user.click(screen.getByText(randomItem.label));

  expect(handleOnSelect).toHaveBeenCalledTimes(1);
  handleOnSelect.mockClear();

  for (const child of randomItem.children) {
    const menuItem = screen.getByRole('menuitem', { name: child.label });
    await user.click(menuItem);
    expect(handleOnSelect).toHaveBeenCalledWith([child], child);
  }

  expect(handleOnSelect).toHaveBeenCalledTimes(randomItem.children.length);

  rerender(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[randomItem.children[0]]}
      items={items}
      selectableParent={false}
    />
  );

  await user.click(
    screen.getByRole('menuitem', { name: randomItem.children[0].label })
  );
  expect(handleOnSelect).toHaveBeenCalledWith([], randomItem.children[0]);
});

test('Parent multi select with selectableParent = true', async () => {
  const items = fakeItemsWithChildren();
  const itemWithoutChildren = fakeSelectItem();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={[...items, itemWithoutChildren]}
      selectableParent
    />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  const randomItem = faker.helpers.arrayElement(items);

  const icon = screen.getByRole('menuitem', { name: randomItem.label });
  await user.click(icon);

  expect(handleOnSelect).toHaveBeenCalledWith([randomItem], randomItem);

  rerender(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[randomItem]}
      items={[...items, itemWithoutChildren]}
    />
  );

  await user.click(icon);
  expect(handleOnSelect).toHaveBeenCalledWith([], randomItem);

  rerender(
    <Select
      label={label}
      onSelect={handleOnSelect}
      values={[itemWithoutChildren]}
      items={[...items, itemWithoutChildren]}
    />
  );

  await user.click(
    screen.getByRole('menuitem', { name: itemWithoutChildren.label })
  );
  expect(handleOnSelect).toHaveBeenCalledWith([], itemWithoutChildren);
});

test('Parent multi select - nested selection works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren();
  const handler = vi.fn();

  const { rerender } = render(
    <Select label={label} onSelect={handler} items={items} values={[]} />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  // Go past and back  -- for some reason if you remove the next two lines the test sometimes fails 😅
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowUp}');

  // Enter menu
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowRight}');

  await user.keyboard('{ArrowDown}');

  await user.keyboard('{Enter}');
  let newValues = [items[0].children[0]];
  expect(handler).toBeCalledWith(newValues, items[0].children[0]);

  rerender(
    <Select label={label} onSelect={handler} items={items} values={newValues} />
  );

  const icon1 = screen.getByRole('menuitem', {
    name: items[0].children[0].label,
  });

  const icon2 = screen.getByRole('menuitem', {
    name: items[0].children[1].label,
  });

  await user.click(icon2);

  newValues = [items[0].children[1], items[0].children[0]];
  expect(handler).toBeCalledWith(newValues, items[0].children[1]);

  rerender(
    <Select label={label} onSelect={handler} items={items} values={newValues} />
  );

  await user.click(icon2);

  newValues = [items[0].children[0]];
  expect(handler).toBeCalledWith(newValues, items[0].children[1]);

  rerender(
    <Select label={label} onSelect={handler} items={items} values={newValues} />
  );

  await user.click(icon1);

  expect(handler).toBeCalledWith([], items[0].children[0]);
});

test('Parent multi select - nested selection with preselected parent works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren();
  const handler = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
    />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  // Go past and back  -- for some reason if you remove the next two lines the test sometimes fails 😅
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowUp}');

  // Enter menu
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowRight}');

  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');
  expect(handler).toBeCalledWith([items[0].children[0]], items[0].children[0]);
});

test('Parent multi select - nested child label shows as expected', async () => {
  const label = faker.animal.bear();
  const items = [
    {
      label: 'label 1',
      value: 'value 1',
      children: [
        {
          label: 'label 2',
          value: 'value 2',
          children: [
            {
              label: 'label 3',
              value: 'value 3',
            },
          ],
        },
      ],
    },
  ];

  const handler = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[{ ...items[0].children[0].children[0], children: [] }]}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));

  expect(screen.getByText('label 3')).toBeInTheDocument();
});

test('Basic group single select', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups();
  render(
    <Select
      label={label}
      onSelect={handler}
      groups={groups}
      value={undefined}
    />
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  for (const group of groups) {
    expect(screen.getByText(group.title)).toBeInTheDocument();
    for (const item of group.items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  }

  const randomItem = faker.helpers.arrayElement(
    faker.helpers.arrayElement(groups).items
  );

  await user.click(screen.getByText(randomItem.label));

  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith(randomItem);
});

test('Basic group multi select with preselected item', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups();

  const randomItem = faker.helpers.arrayElement(
    faker.helpers.arrayElement(groups).items
  );
  render(
    <Select
      label={label}
      onSelect={handler}
      groups={groups}
      values={[randomItem]}
    />
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  await user.click(screen.getByRole('menuitem', { name: randomItem.label }));

  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith([], randomItem);
});

test('Parented group multi select', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups(5, true);

  render(
    <Select label={label} onSelect={handler} groups={groups} values={[]} />
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const firstItem = groups[0].items[0];

  await user.click(screen.getByRole('menuitem', { name: firstItem.label }));

  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith([firstItem], firstItem);
});

test('Sorts items as expected', () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const values = [items[3], items[1], items[0]];
  const sortedValues = [items[0], items[1], items[3]];
  const handler = vi.fn();

  const { rerender } = render(
    <Select label={label} onSelect={handler} items={items} values={values} />
  );

  for (let i = 1; i < sortedValues.length; i++) {
    const first = screen.getByText(sortedValues[i - 1].label);
    const second = screen.getByText(sortedValues[i].label);

    expect(first.compareDocumentPosition(second)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  }

  rerender(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={values}
      sortValues={false}
    />
  );

  for (let i = 1; i < values.length; i++) {
    const first = screen.getByText(values[i - 1].label);
    const second = screen.getByText(values[i].label);

    expect(first.compareDocumentPosition(second)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  }
});

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

test('Removing with backspace', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const handler = vi.fn();

  render(
    <Select
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
    />
  );
  const user = userEvent.setup();

  const searchField = screen.getByRole('combobox');

  await user.click(searchField);

  await user.keyboard('{Backspace}');

  await user.keyboard('{Backspace}');

  expect(handler).toHaveBeenCalledWith([], items[0]);
});

test('Keyboard navigation works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems().slice(0, 2);
  const handler = vi.fn();

  render(
    <Select label={label} onSelect={handler} items={items} value={undefined} />
  );
  const user = userEvent.setup();

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

test('Keyboard navigation inside parent item', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren();
  const handler = vi.fn();

  render(<Select label={label} onSelect={handler} items={items} values={[]} />);
  const user = userEvent.setup();

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
  expect(handler).toBeCalledWith([items[0].children[0]], items[0].children[0]);

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
});

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

  for (const variant of VARIANT_OPTIONS) {
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
      'box-shadow',
      `inset 0 -2px 0 0 ${VARIANT_COLORS[variant]}`
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
