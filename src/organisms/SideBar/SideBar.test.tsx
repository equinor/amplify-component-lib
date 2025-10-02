import { act, ReactNode } from 'react';

import { add, home, shopping_basket, star_half } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBar } from 'src/organisms/SideBar/index';
import { MenuItem } from 'src/organisms/SideBar/MenuItem/MenuItem';
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

const renderWithSidebarProvider = (children: ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => (
      <SideBarProvider>
        {children}
        <Outlet />
      </SideBarProvider>
    ),
  });

  const pages = ['/page1', '/page2'].map((path: string) =>
    createRoute({
      path,
      getParentRoute: () => rootRoute,
      component: () => <p>{path}</p>,
    })
  );

  rootRoute.addChildren(pages);

  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/page1'] }),
    routeTree: rootRoute,
  });

  return act(() => render(<RouterProvider router={router} />));
};

test('Renders create new button when onCreate prop is given', async () => {
  await renderWithSidebarProvider(
    <SideBar onCreate={() => console.log('test')} createLabel="createlabel">
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  const createIcon = screen.getAllByTestId('eds-icon-path')[0]; // First icon is create icon
  expect(createIcon).toHaveAttribute('d', add.svgPathData);
});

test('Disabled create new button doesnt fire event', async () => {
  const createNewFn = vi.fn();
  await renderWithSidebarProvider(
    <SideBar createLabel="Create new" onCreate={createNewFn} createDisabled>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
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
  await renderWithSidebarProvider(
    <SideBar
      createLabel={createLabel}
      onCreate={handleOnCreate}
      showCreate={false}
    >
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  const user = userEvent.setup();

  await user.click(screen.getAllByRole('button')[0]);

  const icons = screen.getAllByTestId('eds-icon-path');
  for (const icon of icons) {
    expect(icon).not.toHaveAttribute('d', add.svgPathData);
  }

  expect(screen.queryByText(createLabel)).not.toBeInTheDocument();
});

test('Renders bottom item when provided', async () => {
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
  await renderWithSidebarProvider(
    <SideBar bottomItem={bottomitem}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
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

test('Collapsing sidebar with open menu item closes it', async () => {
  const props: SideBarMenuItem = {
    name: faker.commerce.productName(),
    icon: shopping_basket,
    items: [
      {
        link: '/dog',
        name: faker.animal.dog(),
      },
      {
        link: '/cat',
        name: faker.animal.cat(),
      },
    ],
  };

  await renderWithSidebarProvider(
    <SideBar>
      <SideBar.Item {...props} />
    </SideBar>
  );
  const user = userEvent.setup();

  // Open sidebar
  const collapseButton = screen.getAllByRole('button').at(-1)!;
  await user.click(collapseButton);

  // Open menu item
  const menuItemButton = screen.getAllByRole('button')[0];
  await user.click(menuItemButton);

  for (const item of props.items) {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  }

  // Collapse sidebar
  await user.click(collapseButton);

  for (const item of props.items) {
    expect(screen.queryByText(item.name)).not.toBeInTheDocument();
  }
});
