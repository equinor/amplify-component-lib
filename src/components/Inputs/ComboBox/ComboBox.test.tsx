import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { ComboBox } from './ComboBox';
import { render, screen, userEvent } from 'src/tests/test-utils';

import { expect } from 'vitest';

const { colors } = tokens;

function fakeItem() {
  return {
    label: faker.string.uuid(),
    value: faker.string.uuid(),
  };
}

function fakeItems(count = 10) {
  return new Array(count).fill(0).map(() => fakeItem());
}

function fakeGroups(count = 5) {
  return new Array(count)
    .fill(0)
    .map(() => ({
      title: faker.airline.airplane().name,
      items: fakeItems(),
    }))
    .filter(
      (group, index, array) =>
        index === array.findIndex((item) => item.title === group.title)
    );
}

function fakeItemsWithChildren(count = 5) {
  return new Array(count).fill(0).map(() => ({
    ...fakeItem(),
    children: new Array(2).fill(0).map(() => ({ ...fakeItem() })),
  }));
}

test('Basic single select', async () => {
  const items = fakeItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
    />
  );
  const user = userEvent.setup();

  expect(screen.getByText(label)).toBeInTheDocument();

  await user.click(screen.getByRole('combobox'));

  for (const item of items) {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  }

  const randomItem = faker.helpers.arrayElement(items);

  await user.click(screen.getByText(randomItem.label));

  expect(handleOnSelect).toHaveBeenCalledTimes(1);
  expect(handleOnSelect).toHaveBeenCalledWith(randomItem);

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      value={randomItem}
      items={items}
    />
  );

  expect(screen.getByText(randomItem.label)).toBeInTheDocument();
});

test('Basic multi select', async () => {
  const items = fakeItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
    />
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
    <ComboBox
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

  for (const child of randomItem.children) {
    const menuItem = screen.getByRole('menuitem', { name: child.label });
    await user.click(menuItem);
    expect(handleOnSelect).toHaveBeenCalledWith([child], child);
    expect(menuItem.children[0]).toHaveStyle(
      'grid-template-columns: 24px auto 1fr'
    );
  }

  expect(handleOnSelect).toHaveBeenCalledTimes(randomItem.children.length);

  rerender(
    <ComboBox
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
  const itemWithoutChildren = fakeItem();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <ComboBox
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

  expect(handleOnSelect).toHaveBeenCalledWith(
    [
      { children: [], label: randomItem.label, value: randomItem.value },
      ...(randomItem?.children || []),
    ],
    randomItem
  );

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[randomItem, ...randomItem.children]}
      items={[...items, itemWithoutChildren]}
    />
  );

  await user.click(icon);
  expect(handleOnSelect).toHaveBeenCalledWith([], randomItem);

  rerender(
    <ComboBox
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

test('Basic group single select', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups();
  render(
    <ComboBox
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
    <ComboBox
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

test('Throws error if providing groups and items', async () => {
  const handle = vi.fn();
  console.error = vi.fn();
  expect(() =>
    render(
      <ComboBox
        label="hei"
        onSelect={handle}
        items={[]}
        groups={[]}
        value={undefined}
      />
    )
  ).toThrowError();
});

test('Sorts items as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItems();
  const values = [items[3], items[1], items[0]];
  const sortedValues = [items[0], items[1], items[3]];
  const handler = vi.fn();

  const { rerender } = render(
    <ComboBox label={label} onSelect={handler} items={items} values={values} />
  );

  for (let i = 1; i < sortedValues.length; i++) {
    const first = screen.getByText(sortedValues[i - 1].label);
    const second = screen.getByText(sortedValues[i].label);

    expect(first.compareDocumentPosition(second)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  }

  rerender(
    <ComboBox
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
  const items = fakeItems();
  render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
    />
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
  const items = fakeItems();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
    />
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
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      value={randomItem}
    />
  );

  // Opens when typing again

  const nextRandom = items.at(
    items.findIndex((i) => i.value === randomItem.value) - 1
  ) as any;

  await user.keyboard(nextRandom.label);

  expect(
    screen.getByRole('menuitem', { name: nextRandom.label })
  ).toBeInTheDocument();
});

test("Clicking 'x' on chip works as expected", async () => {
  const label = faker.animal.bear();
  const items = fakeItems();
  const handler = vi.fn();

  const { rerender } = render(
    <ComboBox label={label} onSelect={handler} items={items} value={items[0]} />
  );
  const user = userEvent.setup();

  const chip = screen.getByRole('img');

  await user.click(chip);

  expect(handler).toHaveBeenCalledWith(undefined);

  rerender(
    <ComboBox
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
  const items = fakeItems();
  const handler = vi.fn();

  render(
    <ComboBox label={label} onSelect={handler} items={items} value={items[0]} />
  );
  const user = userEvent.setup();

  const searchField = screen.getByRole('combobox');

  await user.click(searchField);

  await user.keyboard('{Backspace}');

  await user.keyboard('{Backspace}');

  expect(handler).toHaveBeenCalledWith(undefined);
});

test('Keyboard navigation works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItems().slice(0, 2);
  const handler = vi.fn();

  render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      value={undefined}
    />
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

test('Placeholder prop works as expected', async () => {
  const placeholder = faker.airline.airport().name;
  const label = faker.animal.bear();
  const items = fakeItems();
  const handler = vi.fn();

  render(
    <ComboBox
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
  const items = fakeItems();
  const handler = vi.fn();

  render(
    <ComboBox
      label={label}
      onSelect={handler}
      value={undefined}
      items={items}
    />
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
    <ComboBox
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

  render(
    <ComboBox label={label} onSelect={handler} items={items} values={[]} />
  );
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
  const items = fakeItems();

  render(
    <ComboBox
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
  const items = fakeItems();

  render(
    <ComboBox
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

test('underlineHighlight works as expected', async () => {
  const items = fakeItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
    />
  );

  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'box-shadow',
    `inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba}`
  );

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
      underlineHighlight={true}
    />
  );

  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'box-shadow',
    `inset 0 -2px 0 0 ${colors.infographic.substitute__blue_overcast.rgba}`
  );
});

test('lightBackground works as expected', async () => {
  const items = fakeItems();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      items={items}
      value={items[0]}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    `${colors.ui.background__light.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyleRule(
    'background',
    `${colors.ui.background__default.rgba}`
  );

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      items={items}
      value={items[0]}
      lightBackground={true}
    />
  );

  expect(screen.queryByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    `${colors.ui.background__default.rgba}`
  );

  expect(screen.queryByTestId('amplify-combobox-chip')).toHaveStyleRule(
    'background',
    `${colors.ui.background__light.rgba}`
  );
});

test('Not able to remove item when disabled/loading', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const items = fakeItems();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      value={items[0]}
      disabled
    />
  );
  const user = userEvent.setup();

  const chip = screen.getByRole('img', { name: /close/i });

  await user.click(chip);

  expect(handler).not.toHaveBeenCalled();

  rerender(
    <ComboBox
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
