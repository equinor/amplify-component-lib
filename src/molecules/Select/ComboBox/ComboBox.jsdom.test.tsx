import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import {
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';

test('Locking closes an open menu so items cannot be added or selected', async () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();
  const handleOnAddItem = vi.fn();
  const props = {
    items,
    values: [],
    onSelect: handleOnSelect,
    onAddItem: handleOnAddItem,
  };

  const { rerender } = render(<ComboBox {...props} />);
  const user = userEvent.setup();

  await user.type(screen.getByRole('combobox'), 'New tag');
  expect(screen.getByRole('menuitem')).toBeInTheDocument();

  rerender(<ComboBox {...props} locked />);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();

  // Unlocking does not reopen the menu by itself
  rerender(<ComboBox {...props} />);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  expect(handleOnAddItem).not.toHaveBeenCalled();
  expect(handleOnSelect).not.toHaveBeenCalled();
});

test('Loading keeps an already open menu selectable', async () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();
  const props = { items, values: [], onSelect: handleOnSelect };

  const { rerender } = render(<ComboBox {...props} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));
  rerender(<ComboBox {...props} loading />);
  await user.click(screen.getByRole('menuitem', { name: items[0].label }));

  expect(handleOnSelect).toHaveBeenCalledWith([items[0]], items[0]);
});

test('Custom value component receives locked so it can hide delete', () => {
  const items = fakeSelectItems();

  render(
    <ComboBox
      items={items}
      values={[items[0]]}
      onSelect={vi.fn()}
      locked
      customValueComponent={({ item, locked }) => (
        <span>{`${item.label} locked=${locked}`}</span>
      )}
    />
  );

  expect(screen.getByText(`${items[0].label} locked=true`)).toBeInTheDocument();
});

test('Ignores a leading space and calls onSearchChange when searching', async () => {
  const items = fakeSelectItems();
  const handleOnSearchChange = vi.fn();

  render(
    <ComboBox
      items={items}
      values={[]}
      onSelect={vi.fn()}
      onSearchChange={handleOnSearchChange}
    />
  );
  const user = userEvent.setup();
  const search = screen.getByRole('combobox');

  await user.type(search, ' ');

  expect(search).toHaveValue('');
  expect(handleOnSearchChange).not.toHaveBeenCalled();

  await user.type(search, 'a');

  expect(handleOnSearchChange).toHaveBeenCalledWith('a');
});
