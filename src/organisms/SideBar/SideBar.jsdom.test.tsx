import { act, ReactNode } from 'react';

import { home, star_half } from '@equinor/eds-icons';
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
import { SideBar } from 'src/organisms/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

const defaultMenuItems: SideBarMenuItem[] = [
  {
    name: 'Home',
    icon: home,
    to: '/home',
    onClick: vi.fn(),
  },
  {
    name: 'Another Link',
    icon: star_half,
    to: '/another',
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

test('Renders closed on initial render', async () => {
  await renderWithSidebarProvider(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );

  expect(screen.getByTestId('sidebar')).toHaveStyle('width: 64px');
});

test('Renders open width when localStorage has it set to open', async () => {
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: true })
  );
  await renderWithSidebarProvider(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  expect(screen.getByTestId('sidebar')).toHaveStyle('width: 231px');
});

test('Opens and closes when pressing the toggle button', async () => {
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: false })
  );
  await renderWithSidebarProvider(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  const user = userEvent.setup();

  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toHaveStyle('width: 64px');

  expect(screen.queryByText('Collapse')).not.toBeInTheDocument();

  const toggleButton = screen.getByRole('button');
  await user.click(toggleButton);

  expect(sidebar).toHaveStyle('width: 231px');
});

test('Render Create button correctly when open', async () => {
  const createLabel = faker.animal.dog();
  const handleOnCreate = vi.fn();
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: false })
  );
  await renderWithSidebarProvider(
    <SideBar createLabel={createLabel} onCreate={handleOnCreate}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  const user = userEvent.setup();

  expect(screen.queryByText(createLabel)).not.toBeInTheDocument();

  const toggleButton = screen.getAllByRole('button').at(-1)!;

  await user.click(toggleButton);

  expect(screen.getByText(createLabel)).toBeInTheDocument();
  const createButton = screen.getAllByRole('button')[0];
  expect(createButton).toHaveStyle('height: 36px');
});
