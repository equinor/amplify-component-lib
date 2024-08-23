import { faker } from '@faker-js/faker';

import { ComboBox } from './ComboBox';
import { fakeGroups } from 'src/molecules/Select/Select.test';
import {
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
