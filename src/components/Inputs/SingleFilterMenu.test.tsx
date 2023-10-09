import { filter_list } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent, within } from '../../tests/test-utils';
import SingleFilterMenu from './SingleFilterMenu';

function getTestProps(): {
  data: string[];
  icon: any;
  menuTitle: string;
  onChange: any;
} {
  return {
    data: new Array(faker.number.int({ min: 1, max: 10 }))
      .fill(0)
      .map(() => faker.string.uuid()),
    icon: filter_list,
    menuTitle: faker.string.uuid(),
    onChange: vi.fn(),
  };
}

test('renders a menu button with menu closed by default', () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props}></SingleFilterMenu>);

  const menuButton = screen.getByTestId('menuButton');
  const menuContainer = screen.getByTestId('menuContainer');

  expect(menuButton).toBeInTheDocument();
  expect(menuContainer).not.toHaveAttribute('open');
});

test('renders the menu when button is clicked', async () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props}></SingleFilterMenu>);
  const user = userEvent.setup();
  const button = await screen.findByTestId('menuButton');
  await user.click(button);

  const menu = await screen.findByTestId('menuContainer');
  expect(menu).toBeVisible();
});

test('renders the menu items', () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props}></SingleFilterMenu>);

  for (const item of props.data) {
    expect(screen.getByText(item)).toBeInTheDocument();
  }
});

test('renders a the chip when menu item is selected and showChip = true', async () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props} showChip></SingleFilterMenu>);
  const menuItemText = props.data[0];
  const user = userEvent.setup();

  const button = await screen.findByTestId('menuButton');
  await user.click(button);

  const menuItem = screen.getByText(menuItemText);
  await user.click(menuItem);

  const chip = await screen.findByTestId('chip');
  expect(chip.innerHTML).toContain(menuItemText);
});

test('triggers onchange when item is selected', async () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props} showChip></SingleFilterMenu>);
  const menuItemText = props.data[0];
  const user = userEvent.setup();

  const menuItem = screen.getByText(menuItemText);
  await user.click(menuItem);

  expect(props.onChange).toHaveBeenCalledWith(menuItemText);
});

test('triggers onchange with undefined clicking selected item', async () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props}></SingleFilterMenu>);
  const menuItemText = props.data[0];
  const user = userEvent.setup();

  const menuItem = screen.getByText(menuItemText);
  await user.click(menuItem);

  expect(props.onChange).toHaveBeenCalledWith(menuItemText);

  await user.click(menuItem);

  expect(props.onChange).toHaveBeenCalledWith(undefined);
});

test('triggers onchange with undefined clicking selected item', async () => {
  const props = getTestProps();
  render(<SingleFilterMenu {...props} showChip></SingleFilterMenu>);
  const menuItemText = props.data[0];
  const user = userEvent.setup();

  const menuItem = screen.getByText(menuItemText);

  await user.click(menuItem);

  expect(props.onChange).toHaveBeenCalledWith(menuItemText);

  const chip = screen.getByTestId('chip');
  const chipClose = within(chip).getByRole('img', { name: /close/i });

  await user.click(chipClose);

  expect(props.onChange).toHaveBeenCalledWith(undefined);
});
