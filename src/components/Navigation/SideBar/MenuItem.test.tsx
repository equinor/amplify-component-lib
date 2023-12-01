import { home } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import SideBarProvider from '../../../providers/SideBarProvider';
import { render, screen, userEvent } from '../../../tests/test-utils';
import MenuItem, { MenuItemProps } from './MenuItem';
import { backgroundColor } from './MenuItem.utils';
import { SidebarTheme } from './SideBar.types';

function fakeProps(): MenuItemProps {
  return {
    currentUrl: faker.internet.url(),
    link: faker.internet.url(),
    icon: home,
    name: faker.person.jobTitle(),
    onClick: vi.fn() as any,
  };
}

test('MenuItem works as expected in light mode', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} />, { wrapper: SideBarProvider });
  const user = userEvent.setup();

  const button = screen.getByTestId('sidebar-menu-item');

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});

test('MenuItem works as expected in dark mode', async () => {
  const props = fakeProps();
  render(<MenuItem theme="dark" {...props} />, { wrapper: SideBarProvider });
  const user = userEvent.setup();

  const button = screen.getByTestId('sidebar-menu-item');

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});

test('MenuItem renders as expected when active in light mode', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} currentUrl={props.link} />, {
    wrapper: SideBarProvider,
  });
  const button = screen.getByTestId('sidebar-menu-item');

  expect(button).toHaveStyleRule(
    'background',
    backgroundColor(SidebarTheme.light)
  );
});

test('MenuItem renders as expected when active in dark mode', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} currentUrl={props.link} theme="dark" />, {
    wrapper: SideBarProvider,
  });
  const button = screen.getByTestId('sidebar-menu-item');

  expect(button).toHaveStyleRule(
    'background',
    backgroundColor(SidebarTheme.dark)
  );
});

test('MenuItem text renders as correctly when open and active', async () => {
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: true })
  );
  const props = fakeProps();
  render(<MenuItem {...props} currentUrl={props.link} />, {
    wrapper: SideBarProvider,
  });
  const itemText = screen.getByText(props.name);

  expect(itemText).toHaveStyleRule('font-weight', '500');
});

test('Active MenuItem doesnt fire onClick when pressed', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} currentUrl={props.link} />, {
    wrapper: SideBarProvider,
  });
  const user = userEvent.setup();

  const button = screen.getByTestId('sidebar-menu-item');

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(0);
});

test('Disabled MenuItem doesnt fire onClick when pressed', async () => {
  const props = fakeProps();
  const { rerender } = render(<MenuItem {...props} disabled />, {
    wrapper: SideBarProvider,
  });
  const user = userEvent.setup();

  const button = screen.getByTestId('sidebar-menu-item');

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(0);

  rerender(<MenuItem theme="dark" {...props} disabled />);

  await user.click(button);

  expect(props.onClick).toHaveBeenCalledTimes(0);
});
