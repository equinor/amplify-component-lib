import { FC, FormEvent } from 'react';

import { faker } from '@faker-js/faker';

import { ComboBox } from './ComboBox';
import { spacings } from 'src/atoms/style';
import { ComboBoxChip } from 'src/molecules/Select/Select.styles';
import {
  fakeGroups,
  fakeItemsWithChildren,
} from 'src/molecules/Select/Select.test';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import {
  fakeSelectItems,
  render,
  screen,
  userEvent,
  within,
} from 'src/tests/browsertest-utils';

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

test("Passing 'data-testid' attribute works", () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();
  const someId = faker.vehicle.vehicle();
  render(
    <ComboBox
      values={[]}
      onSelect={handleOnSelect}
      items={items}
      data-testid={someId}
    />
  );

  expect(screen.getByTestId(someId)).toBeInTheDocument();
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

test('OnAddItem works as expected with {Enter} and preselected values', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const items = fakeSelectItems();
  render(
    <ComboBox
      values={[items[0]]}
      onSelect={handleOnSelect}
      onAddItem={handleOnAddItem}
      items={items}
    />
  );
  const user = userEvent.setup();

  const input = screen.getByRole('combobox');

  const someRandomText = faker.vehicle.vehicle();

  await user.click(input);

  await user.type(input, someRandomText);

  await user.keyboard('{Enter}');

  expect(handleOnAddItem).toHaveBeenCalledWith(someRandomText);
  expect(handleOnSelect).not.toHaveBeenCalled();
});

test('OnAddItem works as expected with {Enter} inside a form', async () => {
  const handleOnAddItem = vi.fn();
  const handleOnSelect = vi.fn();
  const handleOnSubmit = vi.fn((e: FormEvent) => e.preventDefault());
  const items = fakeSelectItems();
  render(
    <form onSubmit={handleOnSubmit}>
      <ComboBox
        values={[items[0]]}
        onSelect={handleOnSelect}
        onAddItem={handleOnAddItem}
        items={items}
      />
    </form>
  );
  const user = userEvent.setup();

  const input = screen.getByRole('combobox');

  const someRandomText = faker.vehicle.vehicle();

  await user.click(input);

  await user.type(input, someRandomText);

  await user.keyboard('{Enter}');

  expect(handleOnAddItem).toHaveBeenCalledWith(someRandomText);
  expect(handleOnSelect).not.toHaveBeenCalled();
  expect(handleOnSubmit).not.toHaveBeenCalled();
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
  expect(handleOnAddItem).toHaveBeenCalledTimes(1);
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
  expect(handleOnAddItem).toHaveBeenCalledTimes(1);
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

test('syncParentChild = true works as expected', async () => {
  const items = fakeItemsWithChildren();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[items[0].children[0]]}
      items={items}
    />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const item = items[0];

  await user.click(screen.getByText(item.label));
  expect(handleOnSelect).toHaveBeenCalledWith([item], item);
  expect(handleOnSelect).toHaveBeenCalledTimes(1);
});

test('syncParentChild = false works as expected', async () => {
  const items = fakeItemsWithChildren();
  const label = faker.animal.bear();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[]}
      items={items}
      syncParentChildSelection={false}
    />
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  const item = items[0];

  await user.click(screen.getByText(item.label));
  expect(handleOnSelect).toHaveBeenCalledWith([item], item);
  expect(handleOnSelect).toHaveBeenCalledTimes(1);

  rerender(
    <ComboBox
      label={label}
      onSelect={handleOnSelect}
      values={[item]}
      items={items}
      syncParentChildSelection={false}
    />
  );

  await user.click(screen.getByRole('combobox'));

  const menuItem = screen.getByRole('menuitem', { name: item.label });

  const chevronIcon = within(menuItem.parentElement!).getByRole('button');

  await user.click(chevronIcon);

  const randomChild = faker.helpers.arrayElement(item.children);

  await user.click(screen.getByText(randomChild.label));
  expect(handleOnSelect).toHaveBeenCalledWith([randomChild, item], randomChild);
  expect(handleOnSelect).toHaveBeenCalledTimes(2);
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

test('Parent - nested child paddingLeft as expected', async () => {
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
    <ComboBox label={label} onSelect={handler} items={items} values={[]} />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));

  const label1MenuItem = screen.getByRole('menuitem', { name: 'label 1' });
  expect(label1MenuItem.parentElement).toHaveAttribute(
    'style',
    `padding-left: ${spacings.small};`
  );

  await user.click(
    within(label1MenuItem.parentElement!).getByTestId('toggle-button')
  );

  expect(
    screen.getByRole('menuitem', { name: 'label 2' }).parentElement
  ).toHaveAttribute('style', `padding-left: 0px;`);
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

test('Filtering group works as expected', async () => {
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

  const searchField = screen.getByRole('combobox');
  await user.type(searchField, groups[0].title);

  for (const group of groups.slice(1)) {
    expect(screen.queryByText(group.title)).not.toBeInTheDocument();
  }
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

const CustomValueElement: FC<{
  item: SelectOptionRequired;
  onDelete: () => void;
  tryingToRemove: boolean;
}> = ({ item, onDelete, tryingToRemove }) => (
  <ComboBoxChip
    className="amplify-combo-box-chip"
    onDelete={onDelete}
    $tryingToRemove={tryingToRemove}
  >
    <span>custom</span>
    {item.label}
  </ComboBoxChip>
);

describe('Custom value component', () => {
  test('Renders', () => {
    const label = faker.animal.bear();
    const items = fakeSelectItems();
    const handler = vi.fn();

    render(
      <ComboBox
        label={label}
        onSelect={handler}
        items={items}
        values={[items[0]]}
        customValueComponent={CustomValueElement}
      />
    );

    const customChip = screen
      .getByText('custom')
      .closest('.amplify-combo-box-chip');

    expect(customChip).toBeInTheDocument();
  });

  test('Removal by clicking', async () => {
    const label = faker.animal.bear();
    const items = fakeSelectItems();
    const handler = vi.fn();

    const { rerender } = render(
      <ComboBox
        label={label}
        onSelect={handler}
        items={items}
        values={[items[0]]}
        customValueComponent={CustomValueElement}
      />
    );

    const user = userEvent.setup();
    const customChip = screen
      .getByText('custom')
      .closest('.amplify-combo-box-chip');

    await user.click(customChip!);

    expect(handler).toHaveBeenCalledWith([], items[0]);

    rerender(
      <ComboBox
        label={label}
        onSelect={handler}
        items={items}
        values={[]}
        customValueComponent={CustomValueElement}
      />
    );

    expect(screen.queryByText('custom')).not.toBeInTheDocument();
  });

  test('Removal by backspace', async () => {
    const label = faker.animal.bear();
    const items = fakeSelectItems();
    const handler = vi.fn();

    const { rerender } = render(
      <ComboBox
        label={label}
        onSelect={handler}
        items={items}
        values={[items[0]]}
        customValueComponent={CustomValueElement}
      />
    );

    const user = userEvent.setup();
    const searchField = screen.getByRole('combobox');

    await user.click(searchField);
    await user.keyboard('{Backspace}');
    await user.keyboard('{Backspace}');

    expect(handler).toHaveBeenCalledWith([], items[0]);

    rerender(
      <ComboBox
        label={label}
        onSelect={handler}
        items={items}
        values={[]}
        customValueComponent={CustomValueElement}
      />
    );

    expect(screen.queryByText('custom')).not.toBeInTheDocument();
  });
});

test('showSelectedValuesAsText', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const groups = fakeGroups(5, true);
  const handler = vi.fn();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={[]}
      showSelectedAsText
    />
  );

  const user = userEvent.setup();

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
      showSelectedAsText
    />
  );

  expect(screen.getByText(`1/${items.length} Selected`)).toBeInTheDocument();

  const search = screen.getByRole('combobox');
  await user.type(search, items[1].label);

  expect(
    screen.queryByText(`1/${items.length} Selected`)
  ).not.toBeInTheDocument();

  await user.clear(search);

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      groups={groups}
      values={[items[0]]}
      showSelectedAsText
    />
  );
  expect(
    screen.getByText(
      `1/${groups.flatMap((group) => group.items).length} Selected`
    )
  ).toBeInTheDocument();
});

test('custom showSelectedValuesAsText function', async () => {
  const label = faker.animal.bear();
  const items = fakeSelectItems();
  const groups = fakeGroups(5, true);
  const handler = vi.fn();

  const { rerender } = render(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={[]}
      showSelectedAsText={({ selectedAmount, totalAmount }) =>
        `${selectedAmount} of ${totalAmount} selected`
      }
    />
  );

  const user = userEvent.setup();

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      items={items}
      values={[items[0]]}
      showSelectedAsText={({ selectedAmount, totalAmount }) =>
        `${selectedAmount} of ${totalAmount} selected`
      }
    />
  );

  expect(screen.getByText(`1 of ${items.length} selected`)).toBeInTheDocument();

  const search = screen.getByRole('combobox');
  await user.type(search, items[1].label);

  expect(
    screen.queryByText(`1 of ${items.length} selected`)
  ).not.toBeInTheDocument();

  await user.clear(search);

  rerender(
    <ComboBox
      label={label}
      onSelect={handler}
      groups={groups}
      values={[items[0]]}
      showSelectedAsText={({ selectedAmount, totalAmount }) =>
        `${selectedAmount} of ${totalAmount} selected`
      }
    />
  );
  expect(
    screen.getByText(
      `1 of ${groups.flatMap((group) => group.items).length} selected`
    )
  ).toBeInTheDocument();
});

test('Custom menu item renders as expected', async () => {
  const label = faker.animal.bear();
  const items = [
    {
      label: 'label 1',
      value: 'value 1',
      children: [
        {
          label: 'label 2',
          value: 'value 2',
        },
        {
          label: 'label 3',
          value: 'value 3',
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
      values={[items[0].children[0]]}
      CustomMenuItemComponent={({ item }) => (
        <span>custom item - {item.value}</span>
      )}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));

  const label1MenuItem = screen.getByRole('menuitem', {
    name: 'custom item - value 1',
  });

  await user.click(
    within(label1MenuItem.parentElement!).getByTestId('toggle-button')
  );

  expect(screen.getByText('custom item - value 2')).toBeInTheDocument();
});
