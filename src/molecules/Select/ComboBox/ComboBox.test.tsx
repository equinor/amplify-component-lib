import { faker } from '@faker-js/faker';

import { ComboBox } from './ComboBox';
import {
  fakeGroups,
  fakeItemsWithChildren,
} from 'src/molecules/Select/Select.test';
import {
  fakeSelectItem,
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/test-utils';

test('Renders as expected', () => {
  const items = fakeSelectItems();
  const placeholder = faker.animal.fish();
  const handleOnSelect = vi.fn();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      items={items}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});

test('OnAddItem works as expected with {Enter}', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      onAddItem={handleOnAddItem}
      items={items}
    />
  );
  const user = userEvent.setup();

  const input = screen.getByRole('combobox');

  const someRandomText = faker.vehicle.vehicle();

  await user.type(input, someRandomText);

  await user.keyboard('{Enter}');

  expect(handleOnAddItem).toHaveBeenCalledWith(someRandomText);
});

test('OnAddItem works as expected when clicking item', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      onAddItem={handleOnAddItem}
      items={items}
    />
  );
  const user = userEvent.setup();

  const input = screen.getByRole('combobox');

  const someRandomText = faker.vehicle.vehicle();

  await user.type(input, someRandomText);

  const newTagMenuItem = screen.getByRole('menuitem');

  expect(newTagMenuItem).toBeInTheDocument();

  await user.click(newTagMenuItem);

  expect(handleOnAddItem).toHaveBeenCalledWith(someRandomText);
});

test('OnAddItem works as expected when moving to item and hitting {Enter}', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      onAddItem={handleOnAddItem}
      items={items}
    />
  );
  const user = userEvent.setup({ delay: 100 });

  const input = screen.getByRole('combobox');

  const someRandomText = faker.vehicle.vehicle();

  await user.type(input, someRandomText);

  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(handleOnAddItem).toHaveBeenCalledWith(someRandomText);
});

test('Works as expected when moving past "add new tag" menuitem', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      onAddItem={handleOnAddItem}
      items={items}
    />
  );
  const user = userEvent.setup({ delay: 100 });

  const input = screen.getByRole('combobox');

  const someRandomText = items[0].label.substring(
    0,
    Math.ceil(items[0].label.length / 2)
  );

  await user.type(input, someRandomText);

  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(handleOnSelect).toHaveBeenCalledWith([items[0]], items[0]);
});

test('Throws error if trying to use onAddItem with groups', () => {
  // Silence console.error call
  console.error = vi.fn();

  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const groups = fakeGroups();
  expect(() =>
    render(
      <ComboBox
        values={[]}
        onSelect={handleOnSelect}
        onAddItem={handleOnAddItem}
        groups={groups}
      />
    )
  ).toThrowError();
});

test('Can select items with clicks', async () => {
  const items = fakeSelectItems();
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

test('Parent with selectableParent = false', async () => {
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

  expect(handleOnSelect).toHaveBeenCalledTimes(1);
  handleOnSelect.mockClear();

  for (const child of randomItem.children) {
    const menuItem = screen.getByRole('menuitem', { name: child.label });
    await user.click(menuItem);
    expect(handleOnSelect).toHaveBeenCalledWith([child], child);
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

test('Parent with selectableParent = true', async () => {
  const items = fakeItemsWithChildren();
  const itemWithoutChildren = fakeSelectItem();
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

  expect(handleOnSelect).toHaveBeenCalledWith([randomItem], randomItem);

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[randomItem]}
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

test('Parent - nested selection works as expected with keyboard', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren();
  const handler = vi.fn();

  const { rerender } = render(
    <ComboBox label={label} onSelect={handler} items={items} values={[]} />
  );
  const user = userEvent.setup({ delay: 100 });

  await user.click(screen.getByRole('combobox'));

  // Enter menu
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowRight}');

  await user.keyboard('{ArrowDown}');

  await user.keyboard('{Enter}');
  let newValues = [items[0].children[0]];
  expect(handler).toBeCalledWith(newValues, items[0].children[0]);

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={newValues}
    />
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
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={newValues}
    />
  );

  await user.click(icon2);

  newValues = [items[0].children[0]];
  expect(handler).toBeCalledWith(newValues, items[0].children[1]);

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={newValues}
    />
  );

  await user.click(icon1);

  expect(handler).toBeCalledWith([], items[0].children[0]);
});

test('Parent - nested selection with preselected parent works as expected', async () => {
  const label = faker.animal.bear();
  const items = fakeItemsWithChildren();
  const handler = vi.fn();

  render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
    />
  );
  const user = userEvent.setup({ delay: 100 });

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

test('Parent - nested child label shows as expected', async () => {
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
    <ComboBox
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

test('Basic group with preselected item', async () => {
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

test('Parented group', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups(5, true);

  render(
    <ComboBox label={label} onSelect={handler} groups={groups} values={[]} />
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

test('Removing with backspace', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const handler = vi.fn();

  render(
    <ComboBox
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
