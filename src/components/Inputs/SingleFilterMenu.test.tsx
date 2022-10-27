import { filter_list } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../test-utils';
import SingleFilterMenu from './SingleFilterMenu';

function getTestProps(): {
  data: string[];
  icon: any;
  menuTitle: string;
  onChange: any;
} {
  return {
    data: faker.lorem
      .words(faker.datatype.number({ min: 1, max: 5 }))
      .split(' ')
      .filter((v, i, a) => a.indexOf(v) === i),
    icon: filter_list,
    menuTitle: faker.lorem.word(),
    onChange: jest.fn(),
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
  expect(menu).toHaveStyle('visibility: visible');
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

  expect(props.onChange).toHaveBeenCalled();
});
