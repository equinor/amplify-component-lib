import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { add, home, star_half } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBar } from 'src/organisms/SideBar/index';
import { MenuItem } from 'src/organisms/SideBar/MenuItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent, within } from 'src/tests/browsertest-utils';

const defaultMenuItems: SideBarMenuItem[] = [
  {
    name: 'Home',
    icon: home,
    link: 'home',
    onClick: vi.fn(),
  },
  {
    name: 'Another Link',
    icon: star_half,
    link: 'another',
    onClick: vi.fn(),
  },
];

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={<SideBarProvider>{children}</SideBarProvider>}
        />
        <Route path="/page1" element={<p>Page 1</p>} />
      </Routes>
    </MemoryRouter>
  );
};

test('Renders create new button when onCreate prop is given', () => {
  render(
    <SideBar onCreate={() => console.log('test')} createLabel="createlabel">
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: wrapper,
    }
  );
  const createIcon = screen.getAllByTestId('eds-icon-path')[0];
  expect(createIcon).toHaveAttribute('d', add.svgPathData);
});

test('Disabled create new button doesnt fire event', async () => {
  const createNewFn = vi.fn();
  render(
    <SideBar createLabel="Create new" onCreate={createNewFn} createDisabled>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: wrapper,
    }
  );

  const user = userEvent.setup();

  const createNewButton = screen.getAllByRole('button')[0];
  await user.click(createNewButton);

  expect(createNewFn).not.toHaveBeenCalled();
});

test('Hides create button when showCreate=false', async () => {
  const createLabel = faker.animal.dog();
  const handleOnCreate = vi.fn();
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: false })
  );
  render(
    <SideBar
      createLabel={createLabel}
      onCreate={handleOnCreate}
      showCreate={false}
    >
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    { wrapper: wrapper }
  );
  const user = userEvent.setup();

  await user.click(screen.getAllByRole('button')[0]);

  const icons = screen.getAllByTestId('eds-icon-path');
  for (const icon of icons) {
    expect(icon).not.toHaveAttribute('d', add.svgPathData);
  }

  expect(screen.queryByText(createLabel)).not.toBeInTheDocument();
});

test('Renders bottom item when provided', () => {
  const bottomItemProps: SideBarMenuItem = {
    name: faker.animal.dog(),
    icon: star_half,
    link: faker.internet.url(),
    onClick: vi.fn(),
  };
  const bottomitem = <MenuItem {...bottomItemProps} />;
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: true })
  );
  render(
    <SideBar bottomItem={bottomitem}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    { wrapper: wrapper }
  );

  const menuItems = screen.getAllByTestId('sidebar-menu-item');

  const item1 = menuItems[0];
  const text1 = within(item1).getByText(defaultMenuItems[0].name);
  expect(text1).toBeInTheDocument();

  const item2 = menuItems[1];
  const text2 = within(item2).getByText(defaultMenuItems[1].name);
  expect(text2).toBeInTheDocument();

  const bottomMenuItem = menuItems[2];
  const bottomText = within(bottomMenuItem).getByText(bottomItemProps.name);
  expect(bottomText).toBeInTheDocument();
});
