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
