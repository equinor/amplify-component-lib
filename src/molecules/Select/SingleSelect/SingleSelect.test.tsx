import { faker } from '@faker-js/faker';

import { SingleSelect } from './SingleSelect';
import { fakeGroups } from 'src/molecules/Select/Select.test';
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
    <SingleSelect
      value={undefined}
      onSelect={handleOnSelect}
      items={items}
      placeholder={placeholder}
    />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();
});

test('Passing "data-testid" attribute works as expected', () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();
  const someId = faker.book.title();

  render(
    <SingleSelect
      value={undefined}
      onSelect={handleOnSelect}
      items={items}
      data-testid={someId}
    />
  );

  expect(screen.getByTestId(someId)).toBeInTheDocument();
});

test('Works as expected when clicking items', async () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const meta = faker.animal.insect();
  const handleOnSelect = vi.fn();
  const { rerender } = render(
    <SingleSelect
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
    <SingleSelect
      label={label}
      meta={meta}
      onSelect={handleOnSelect}
      value={randomItem}
      items={items}
    />
  );
});

test('HelperText', () => {
  const items = fakeSelectItems();
  const helperText = faker.airline.airplane().name;
  const handleOnSelect = vi.fn();
  render(
    <SingleSelect
      helperText={helperText}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
    />
  );

  expect(screen.getByText(helperText)).toBeInTheDocument();
});

test('HelperText and variant', () => {
  const items = fakeSelectItems();
  const helperText = faker.airline.airplane().name;
  const handleOnSelect = vi.fn();
  render(
    <SingleSelect
      helperText={helperText}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
      variant="error"
    />
  );

  const helperTextElement = screen.getByText(helperText);
  const helperIcon = within(
    helperTextElement.parentElement!.parentElement!
  ).getByTestId('eds-icon-path');

  expect(helperTextElement).toBeInTheDocument();
  expect(helperIcon).toBeInTheDocument();
});

test('Only meta label', () => {
  const items = fakeSelectItems();
  const meta = faker.animal.insect();
  const handleOnSelect = vi.fn();
  render(
    <SingleSelect
      meta={meta}
      onSelect={handleOnSelect}
      value={undefined}
      items={items}
    />
  );

  expect(screen.getByText(meta)).toBeInTheDocument();
});

test('Groups work as expected when clicking items', async () => {
  const label = faker.animal.bear();
  const handler = vi.fn();
  const groups = fakeGroups();
  render(
    <SingleSelect
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

test('Clicking the same item deselects it', async () => {
  const items = fakeSelectItems();
  const label = faker.animal.bear();
  const meta = faker.animal.insect();
  const handleOnSelect = vi.fn();
  const value = faker.helpers.arrayElement(items);
  render(
    <SingleSelect
      label={label}
      meta={meta}
      onSelect={handleOnSelect}
      value={value}
      items={items}
    />
  );
  const user = userEvent.setup();

  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByText(meta)).toBeInTheDocument();

  await user.click(screen.getByRole('combobox'));

  await user.click(screen.getByRole('menuitem', { name: value.label }));

  expect(handleOnSelect).toHaveBeenCalledTimes(1);
  expect(handleOnSelect).toHaveBeenCalledWith(undefined);
});
