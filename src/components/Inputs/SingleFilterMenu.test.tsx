import { render, screen, userEvent } from '../../test-utils';

import SingleFilterMenu from './SingleFilterMenu';
import { filter_list } from '@equinor/eds-icons';

const dummyData = {
  data: ['test', 'best', '123'],
  icon: filter_list,
  menuTitle: 'Select an item',
  onChange: () => undefined,
};

test('renders a menu button with menu closed by default', () => {
  const { queryByTestId } = render(
    <SingleFilterMenu {...dummyData}></SingleFilterMenu>
  );
  expect(queryByTestId('menuButton')).toBeInTheDocument();
  expect(queryByTestId('menuContainer')).toHaveStyle('visibility: hidden');
});

test('renders the menu when button is clicked', async () => {
  render(<SingleFilterMenu {...dummyData}></SingleFilterMenu>);
  const user = userEvent.setup();
  const button = await screen.findByTestId('menuButton');
  await user.click(button);

  const menu = await screen.findByTestId('menuContainer');
  expect(menu).toHaveStyle('visibility: visible');
});

test('renders a the menu items', () => {
  const { queryByText } = render(
    <SingleFilterMenu {...dummyData}></SingleFilterMenu>
  );
  expect(queryByText('test')).toBeInTheDocument();
  expect(queryByText('best')).toBeInTheDocument();
  expect(queryByText('123')).toBeInTheDocument();
});

test('renders a the chip when menu item is selected and showChip = true', async () => {
  render(<SingleFilterMenu {...dummyData} showChip></SingleFilterMenu>);
  const menuItemText = dummyData.data[2];
  const user = userEvent.setup();

  const button = await screen.findByTestId('menuButton');
  await user.click(button);

  const menuItem = screen.getByText(menuItemText);
  await user.click(menuItem);

  const chip = await screen.findByTestId('chip');
  expect(chip.innerHTML).toContain(menuItemText);
});

test('triggers onchange when item is selected', async () => {
  const cb = jest.fn();
  dummyData.onChange = cb;

  render(<SingleFilterMenu {...dummyData} showChip></SingleFilterMenu>);
  const menuItemText = dummyData.data[2];
  const user = userEvent.setup();

  const menuItem = screen.getByText(menuItemText);
  await user.click(menuItem);

  expect(cb).toHaveBeenCalled();
});
