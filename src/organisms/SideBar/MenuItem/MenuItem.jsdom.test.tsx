import { act, MouseEventHandler, ReactNode } from 'react';

import { home } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

import { colors, spacings } from 'src/atoms/style';
import {
  MenuItem,
  MenuItemProps,
} from 'src/organisms/SideBar/MenuItem/MenuItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

type MenuClickHandler = () => void | MouseEventHandler<HTMLAnchorElement>;

function fakeProps(selected = false): MenuItemProps {
  return {
    to: selected ? '/page1' : '/page2',
    icon: home,
    name: faker.person.jobTitle(),
    onClick: vi.fn() as MenuClickHandler,
  };
}

const renderWithSidebarWrapper = async ({
  children,
}: {
  children: ReactNode;
}) => {
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

describe('MenuItem', () => {
  // Baseline layout styles are static across every state, so this is only
  // asserted once per Expanded/Collapsed group (in their "Default" tests)
  // instead of being repeated in every state-specific test.
  const testBaseStyles = () => {
    const item = screen.getByTestId('sidebar-menu-item');
    const iconContainer = screen.getByTestId('icon-container');
    const svgPath = screen.getByTestId('eds-icon-path');
    const icon = svgPath.parentElement;

    expect(item.localName).toBe('a');
    expect(item).toHaveStyleRule('display', 'flex');
    expect(item).toHaveStyleRule('padding', spacings.medium);
    expect(item).toHaveStyleRule('align-items', 'center');
    expect(item).toHaveStyleRule('gap', spacings.medium);
    expect(item).toHaveStyleRule('align-self', 'stretch');
    expect(item).toHaveStyleRule('box-sizing', 'border-box');
    expect(item).toHaveStyleRule('height', '64px');
    expect(item).toHaveStyleRule('transition', 'background 0.1s ease-out');
    expect(item).toHaveStyleRule('text-decoration', 'none');
    expect(item).toHaveStyleRule(
      'border-bottom',
      `1px solid ${colors.ui.background__medium.rgba}`
    );

    expect(iconContainer).toHaveStyleRule('padding', spacings.x_small);
    expect(iconContainer).toHaveStyleRule('align-items', 'center');
    expect(iconContainer).toHaveStyleRule('width', '32px');
    expect(iconContainer).toHaveStyleRule('height', '32px');
    expect(svgPath).toHaveAttribute('d', home.svgPathData);
    expect(icon).toHaveAttribute('height', '24px');
    expect(icon).toHaveAttribute('width', '24px');
  };

  test('should navigate if replace is set to true and url is a partial match', async () => {
    const props = fakeProps();
    await renderWithSidebarWrapper({
      children: <MenuItem {...props} replace />,
    });
  });

  describe('Expanded', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'amplify-sidebar-state',
        JSON.stringify({ isOpen: true })
      );
    });
    describe('Renders with correct styles', () => {
      test('Default', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });
        const text = screen.getByText(props.name);

        testBaseStyles();

        expect(text).toHaveStyleRule(
          'color',
          colors.text.static_icons__default.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Hover', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.hover(item);

        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__hover_alt.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });
      });

      test('Selected', async () => {
        const props = fakeProps(true);
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        expect(item).toHaveAttribute('data-status', 'active');
      });

      test('Selected + Hover', async () => {
        const props = fakeProps(true);
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.hover(item);

        expect(item).toHaveAttribute('data-status', 'active');
        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__selected_hover.rgba,
          { modifier: "&[data-status='active']:hover" }
        );
      });

      test('Focus', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.tab();

        expect(item).toHaveFocus();
      });

      test('Disabled', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} disabled />,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        expect(item).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('Collapsed', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'amplify-sidebar-state',
        JSON.stringify({ isOpen: false })
      );
    });
    describe('Renders with correct styles', () => {
      test('Default', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(text).not.toBeInTheDocument();
      });

      test('Hover', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.hover(item);

        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__hover_alt.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });
      });

      test('Selected', async () => {
        const props = fakeProps(true);
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        expect(item).toHaveAttribute('data-status', 'active');
      });

      test('Selected + Hover', async () => {
        const props = fakeProps(true);
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });

        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.hover(item);

        expect(item).toHaveAttribute('data-status', 'active');
        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__selected_hover.rgba,
          { modifier: "&[data-status='active']:hover" }
        );
      });

      test('Focus', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} />,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        const user = userEvent.setup();
        await user.tab();

        expect(item).toHaveFocus();
      });

      test('Disabled', async () => {
        const props = fakeProps();
        await renderWithSidebarWrapper({
          children: <MenuItem {...props} disabled />,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        expect(item).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });
});
