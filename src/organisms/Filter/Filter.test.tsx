import { faker } from '@faker-js/faker';

import { Filter } from 'src/organisms/Filter/Filter';
import { CommonFilterProps } from 'src/organisms/Filter/Filter.types';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps(): Omit<CommonFilterProps<string>, 'children'> {
  return {
    values: new Array(faker.number.int({ min: 1, max: 10 }))
      .fill(null)
      .map(() => ({
        key: faker.string.uuid(),
        label: faker.string.uuid(),
      })),
    onClearAllFilters: vi.fn(),
    onClearFilter: vi.fn(),
    search: '',
    onSearchEnter: vi.fn(),
    onSearchChange: vi.fn(),
  };
}

test('Filter opens/closes as expected when clicking search field', async () => {
  const props = fakeProps();
  const childText = faker.lorem.sentence();
  render(
    <Filter {...props}>
      <p>{childText}</p>
    </Filter>
  );

  const user = userEvent.setup();

  expect(screen.queryByText(childText)).not.toBeInTheDocument();

  await user.click(screen.getByRole('searchbox'));

  expect(screen.getByText(childText)).toBeInTheDocument();
});

test('ID works as expected', async () => {
  const props = fakeProps();
  const childText = faker.lorem.sentence();
  const id = faker.lorem.word();
  render(
    <Filter {...props} id={id}>
      <p>{childText}</p>
    </Filter>
  );
  const search = screen.getByRole('searchbox');

  expect(search).toHaveAttribute('id', id);
});

test('Filter opens/closes as expected when clicking search field with multiple children', async () => {
  const props = fakeProps();
  const childText = faker.lorem.sentence().split(' ');
  render(
    <Filter {...props}>
      {childText.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </Filter>
  );

  const user = userEvent.setup();

  for (const text of childText) {
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  }

  await user.click(screen.getByRole('searchbox'));

  for (const text of childText) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }
});

test('Custom placeholder works as expected', () => {
  const props = fakeProps();
  const placeholder = faker.lorem.sentence();
  render(
    <Filter {...props} placeholder={placeholder}>
      <p>child</p>
    </Filter>
  );

  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('Values show as expected', () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );

  // Label + close is needed because of the close icon that is shown
  props.values.forEach(({ label }) => {
    expect(
      screen.getByRole('button', { name: `${label} close` })
    ).toBeInTheDocument();
  });
});

test('onClearFilter is called when hitting backspace twice', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);

  await user.keyboard('{Backspace}');
  await user.keyboard('{Backspace}');

  expect(props.onClearFilter).toHaveBeenCalledTimes(1);
  expect(props.onClearFilter).toHaveBeenCalledWith(
    props.values[props.values.length - 1].key
  );
});

test('onClearFilter is called when clicking X', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const randomValue = faker.helpers.arrayElement(props.values);

  const closeButton = screen.getByRole('button', {
    name: `${randomValue.label} close`,
  });

  await user.click(closeButton);

  expect(props.onClearFilter).toHaveBeenCalledTimes(1);
  expect(props.onClearFilter).toHaveBeenCalledWith(randomValue.key);
});

test('onClearAllFilters is called when clicking clear all and search is cleared', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const searchBox = screen.getByRole('searchbox');

  await user.type(searchBox, faker.lorem.word());

  const clearAllButton = screen.getByTestId('clear-all-x');

  await user.click(clearAllButton);

  expect(props.onClearAllFilters).toHaveBeenCalledTimes(1);
  expect(searchBox).toHaveValue('');
});

test('initialOpen works as expected', async () => {
  const props = fakeProps();
  const childText = faker.lorem.sentence();
  render(
    <Filter {...props} initialOpen>
      <p>{childText}</p>
    </Filter>
  );
  const user = userEvent.setup();

  expect(screen.getByText(childText)).toBeInTheDocument();

  await user.click(screen.getByTestId('toggle-open-button'));

  // Wait for animation
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.queryByText(childText)).not.toBeInTheDocument();
});

test('onSearch is called when hitting enter and search is not empty string', async () => {
  const props = fakeProps();
  const { rerender } = render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const searchBox = screen.getByRole('searchbox');

  await user.click(searchBox);

  await user.keyboard('{Enter}');
  expect(props.onSearchEnter).not.toHaveBeenCalled();

  const randomWord = faker.lorem.word();
  await user.type(searchBox, `${randomWord}`);
  expect(props.onSearchChange).toHaveBeenCalled();

  rerender(
    <Filter {...props} search={randomWord}>
      <p>child</p>
    </Filter>
  );

  await user.keyboard('{Enter}');

  expect(props.onSearchEnter).toHaveBeenCalledTimes(1);
  expect(props.onSearchEnter).toHaveBeenCalledWith(randomWord);
});

test('Sorting works as expected', async () => {
  const props = fakeProps();
  const sortItems = new Array(faker.number.int({ min: 5, max: 10 }))
    .fill(null)
    .map(() => ({
      value: faker.string.uuid(),
      label: faker.string.uuid(),
    }));
  const initialSorting = sortItems[0];
  const onSortChange = vi.fn();

  render(
    <Filter
      {...props}
      sortValue={initialSorting.value}
      sortItems={sortItems}
      onSortChange={onSortChange}
    >
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const sortButton = screen.getByRole('button', {
    name: `Sort by ${initialSorting.label.toLowerCase()}`,
  });

  await user.click(sortButton);

  const randomItem = faker.helpers.arrayElement(sortItems.slice(1));

  const item = screen.getByRole('menuitem', { name: randomItem.label });
  await user.click(item);

  expect(onSortChange).toHaveBeenCalledWith(randomItem.value);
});

test('Quick filter works as expected', async () => {
  const props = fakeProps();

  const quickFilterItems = new Array(faker.number.int({ min: 5, max: 10 }))
    .fill(null)
    .map(() => ({
      value: faker.string.uuid(),
      label: faker.string.uuid(),
    }));
  const onQuickFilter = vi.fn();

  render(
    <Filter
      {...props}
      quickFilterItems={quickFilterItems}
      onQuickFilter={onQuickFilter}
    >
      <p>child</p>
    </Filter>
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /quick filter/i }));

  const randomItem = faker.helpers.arrayElement(quickFilterItems);

  await user.click(screen.getByText(randomItem.label));

  expect(onQuickFilter).toHaveBeenCalledWith(randomItem.value);
});
