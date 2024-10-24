import { faker } from '@faker-js/faker';

import { Filter, FilterProps } from 'src/organisms/Filter/Filter';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps(): Omit<FilterProps, 'children'> {
  return {
    values: new Array(faker.number.int({ min: 1, max: 10 }))
      .fill(null)
      .map(() => ({
        value: faker.string.uuid(),
        label: faker.animal.dog(),
      })),
    onClearAllFilters: vi.fn(),
    onClearFilter: vi.fn(),
    onSearch: vi.fn(),
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
    props.values[props.values.length - 1].value
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
  expect(props.onClearFilter).toHaveBeenCalledWith(randomValue.value);
});

test('onClearAllFilters is called when clicking clear all', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const clearAllButton = screen.getAllByRole('button').at(-2)!;

  await user.click(clearAllButton);

  expect(props.onClearAllFilters).toHaveBeenCalledTimes(1);
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

test('onSearch is called when hitting enter', async () => {
  const props = fakeProps();
  render(
    <Filter {...props}>
      <p>child</p>
    </Filter>
  );
  const user = userEvent.setup();

  const searchBox = screen.getByRole('searchbox');

  await user.click(searchBox);

  const randomWord = faker.lorem.word();
  await user.type(searchBox, `${randomWord}{Enter}`);

  expect(props.onSearch).toHaveBeenCalledTimes(1);
  expect(props.onSearch).toHaveBeenCalledWith(randomWord);
});
