import { faker } from '@faker-js/faker';

import { Filter } from 'src/organisms/Filter/Filter';
import { FilterProps } from 'src/organisms/Filter/Filter.types';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

function fakeProps(): Omit<FilterProps<string>, 'children'> {
  return {
    values: {
      [faker.lorem.word()]: new Array(faker.number.int({ min: 1, max: 5 }))
        .fill(0)
        .map(() => ({
          value: faker.string.uuid(),
          label: faker.string.uuid(),
        })),
    },
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

  expect(search).toHaveAttribute('id', `filter-search-${id}`);
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
    <Filter {...props} values={{}} placeholder={placeholder}>
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
  const values = Object.values(props.values).flat();
  values.forEach(({ label }) => {
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

  const key = Object.keys(props.values)[0]; // We know there is only 1
  const lastValue = Object.values(props.values).flat().length - 1;
  expect(props.onClearFilter).toHaveBeenCalledTimes(1);
  expect(props.onClearFilter).toHaveBeenCalledWith(key, lastValue);
});

test('onClearFilter is called when clicking X', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const key = Object.keys(props.values)[0]; // We know there is only 1
  const allValues = Object.values(props.values).flat();
  const randomIndex = faker.number.int({ min: 0, max: allValues.length - 1 });
  const randomValue = allValues[randomIndex];

  const closeButton = screen.getByRole('button', {
    name: `${randomValue.label} close`,
  });

  await user.click(closeButton);

  expect(props.onClearFilter).toHaveBeenCalledTimes(1);
  expect(props.onClearFilter).toHaveBeenCalledWith(key, randomIndex);
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

test('Auto complete options work as expected', async () => {
  const props = fakeProps();
  const onAutoComplete = vi.fn();
  const user = userEvent.setup();

  const key = Object.keys(props.values)[0];
  const randomValue = faker.helpers.arrayElement(
    Object.values(props.values).flat()
  );
  const { rerender } = render(
    <Filter
      {...props}
      values={{}}
      search={''}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );
  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);

  for (const value of Object.values(props.values[key]).flat()) {
    expect(
      screen.queryByRole('menuitem', { name: value.label })
    ).not.toBeInTheDocument();
  }

  rerender(
    <Filter
      {...props}
      values={{}}
      search={'a'}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );

  await user.click(searchBox);

  for (const value of Object.values(props.values[key]).flat()) {
    if (value.label.includes('a')) {
      expect(
        await screen.findByRole('menuitem', { name: value.label })
      ).toBeInTheDocument();
    }
  }

  rerender(
    <Filter
      {...props}
      values={{}}
      search={randomValue.label}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );

  await user.click(searchBox);
  await user.keyboard('{Enter}');

  expect(onAutoComplete).toHaveBeenCalledTimes(1);
  expect(onAutoComplete).toHaveBeenCalledWith(key, { key, ...randomValue });
});

test('Auto complete options work as expected when search doesnt match anything', async () => {
  const props = fakeProps();
  const onAutoComplete = vi.fn();

  const key = Object.keys(props.values)[0];
  render(
    <Filter
      {...props}
      values={{}}
      search={faker.animal.fish()}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);
  await user.keyboard('{Enter}');

  expect(onAutoComplete).not.toHaveBeenCalled();
  expect(props.onSearchEnter).toHaveBeenCalledTimes(1);
});

test('Auto complete with keyboard', async () => {
  const props = fakeProps();
  const onAutoComplete = vi.fn();
  const user = userEvent.setup();

  const key = Object.keys(props.values)[0];

  render(
    <Filter
      {...props}
      values={{}}
      search={'a'}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );
  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);

  for (const value of Object.values(props.values[key]).flat()) {
    if (value.label.includes('a')) {
      expect(
        await screen.findByRole('menuitem', { name: value.label })
      ).toBeInTheDocument();
    }
  }

  await user.keyboard('{ArrowDown}');
  const selectedValue = props.values[key][0];
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(onAutoComplete).toHaveBeenCalledTimes(1);
  expect(onAutoComplete).toHaveBeenCalledWith(key, {
    key,
    ...selectedValue,
  });
});

test('Auto complete with click', async () => {
  const props = fakeProps();
  const onAutoComplete = vi.fn();
  const user = userEvent.setup();

  const key = Object.keys(props.values)[0];

  render(
    <Filter
      {...props}
      values={{}}
      search={'a'}
      autoCompleteOptions={{
        [key]: props.values[key],
      }}
      onAutoComplete={onAutoComplete}
    >
      <p>child</p>
    </Filter>
  );
  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);

  for (const value of Object.values(props.values[key]).flat()) {
    if (value.label.includes('a')) {
      expect(
        await screen.findByRole('menuitem', { name: value.label })
      ).toBeInTheDocument();
    }
  }

  const selectedValue = props.values[key][0];

  await user.click(screen.getByRole('menuitem', { name: selectedValue.label }));

  expect(onAutoComplete).toHaveBeenCalledTimes(1);
  expect(onAutoComplete).toHaveBeenCalledWith(key, {
    key,
    ...selectedValue,
  });
});

test('Auto complete menu closes as expected', async () => {
  const props = fakeProps();
  const onAutoComplete = vi.fn();
  const user = userEvent.setup();

  const key = Object.keys(props.values)[0];

  render(
    <div>
      <Filter
        {...props}
        values={{}}
        search={'a'}
        autoCompleteOptions={{
          [key]: props.values[key],
        }}
        onAutoComplete={onAutoComplete}
      >
        <p>child</p>
      </Filter>
      <p>outside</p>
    </div>
  );
  const searchBox = screen.getByRole('searchbox');
  await user.click(searchBox);

  for (const value of Object.values(props.values[key]).flat()) {
    if (value.label.includes('a')) {
      expect(
        await screen.findByRole('menuitem', { name: value.label })
      ).toBeInTheDocument();
    }
  }

  await user.click(screen.getByText('outside'));

  for (const value of Object.values(props.values[key]).flat()) {
    if (value.label.includes('a')) {
      expect(
        screen.queryByRole('menuitem', { name: value.label })
      ).not.toBeInTheDocument();
    }
  }
});
