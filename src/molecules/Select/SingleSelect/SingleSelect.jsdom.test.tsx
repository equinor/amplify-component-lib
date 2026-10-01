import { lock } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style/colors';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import {
  fakeSelectItems,
  render,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';

test('Renders highlight color for selected items', async () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();

  render(
    <SingleSelect value={items[0]} items={items} onSelect={handleOnSelect} />
  );

  const user = userEvent.setup();

  await user.click(screen.getByRole('combobox'));

  expect(
    screen.getByRole('menuitem', { name: items[0].label })
  ).toHaveStyleRule(
    'background',
    colors.interactive.primary__selected_highlight.rgba
  );
});

test('Locked shows lock icon and prevents opening and clearing', async () => {
  const items = fakeSelectItems();
  const handleOnSelect = vi.fn();

  render(
    <SingleSelect
      value={items[0]}
      items={items}
      onSelect={handleOnSelect}
      leadingContent={<span>leading</span>}
      locked
    />
  );

  const user = userEvent.setup();
  const combobox = screen.getByRole('combobox');

  expect(combobox).toHaveAttribute('readonly');
  expect(screen.queryByTestId('clearBtn')).not.toBeInTheDocument();
  expect(screen.queryByText('leading')).not.toBeInTheDocument();
  expect(
    document.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();

  await user.click(combobox);
  await user.keyboard('abc');

  expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  expect(handleOnSelect).not.toHaveBeenCalled();
});

test('Locked and autofilled shows lock icon with autofilled background', () => {
  const items = fakeSelectItems();

  render(
    <SingleSelect
      value={items[0]}
      items={items}
      onSelect={vi.fn()}
      locked
      autofilled
    />
  );

  expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
  expect(screen.queryByTestId('clearBtn')).not.toBeInTheDocument();
  expect(
    document.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();
  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    colors.dataviz.primary.primary20
  );
});

test('Autofilled keeps the select interactive', async () => {
  const items = fakeSelectItems();

  render(
    <SingleSelect
      value={items[0]}
      items={items}
      onSelect={vi.fn()}
      autofilled
    />
  );

  const user = userEvent.setup();
  const combobox = screen.getByRole('combobox');

  expect(combobox).not.toHaveAttribute('readonly');
  expect(combobox).not.toHaveAttribute('autofilled');
  expect(screen.getByTestId('combobox-container')).toHaveStyleRule(
    'background-color',
    colors.dataviz.primary.primary20
  );
  expect(screen.getByTestId('clearBtn')).toBeInTheDocument();

  await user.click(combobox);

  expect(screen.getAllByRole('menuitem').length).toBe(items.length);
});
