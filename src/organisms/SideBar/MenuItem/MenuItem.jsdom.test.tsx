import { MouseEventHandler, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

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
    currentUrl: faker.internet.url(),
    link: selected ? '/page1' : '/page2',
    icon: home,
    name: faker.person.jobTitle(),
    onClick: vi.fn() as MenuClickHandler,
  };
}

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SideBarProvider>
      <MemoryRouter initialEntries={['/page1']}>
        <Routes>
          <Route
            element={
              <div>
                {children}
                <Outlet />
              </div>
            }
          >
            <Route path="/page1" element={<p>page 1</p>} />
            <Route path="/page2" element={<p>page 2</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </SideBarProvider>
  );
};

describe('MenuItem', () => {
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

    expect(iconContainer).toHaveStyleRule('padding', spacings.x_small);
    expect(iconContainer).toHaveStyleRule('align-items', 'center');
    expect(iconContainer).toHaveStyleRule('width', '32px');
    expect(iconContainer).toHaveStyleRule('height', '32px');
    expect(svgPath).toHaveAttribute('d', home.svgPathData);
    expect(icon).toHaveAttribute('height', '24px');
    expect(icon).toHaveAttribute('width', '24px');
  };

  test('should navigate if replace is set to true and url is a partial match', () => {
    const props = fakeProps();
    render(<MenuItem {...props} replace />, {
      wrapper: wrapper,
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
      test('Default', () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'border-bottom',
          `1px solid ${colors.ui.background__medium.rgba}`
        );

        expect(text).toHaveStyleRule(
          'color',
          colors.text.static_icons__default.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Hover', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        const user = userEvent.setup();
        await user.hover(item);

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__hover_alt.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });
        expect(item).toHaveStyleRule('outline', undefined, {
          modifier: ':hover',
        });
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Selected', () => {
        const props = fakeProps(true);
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'border-bottom',
          `1px solid ${colors.ui.background__medium.rgba}`
        );
        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__selected_highlight.rgba
        );
        expect(item).toHaveStyleRule('outline', undefined);

        expect(text).toHaveStyleRule(
          'color',
          colors.text.static_icons__default.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Selected + Hover', async () => {
        const props = fakeProps(true);
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        const user = userEvent.setup();
        await user.hover(item);

        testBaseStyles();

        expect(item).not.toHaveStyleRule(
          'border-bottom',
          `1px solid ${colors.ui.background__medium.rgba}`,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__selected_hover.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('outline', undefined, {
          modifier: ':hover',
        });
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.primary__resting.rgba
        // );

        expect(text).toHaveStyleRule(
          'color',
          colors.text.static_icons__default.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Focus', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        const user = userEvent.setup();
        await user.tab();

        expect(item).toHaveFocus();

        testBaseStyles();

        expect(text).toHaveStyleRule(
          'color',
          colors.text.static_icons__default.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');
      });

      test('Disabled', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} disabled />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.getByText(props.name);

        testBaseStyles();

        expect(item).toHaveAttribute('aria-disabled', 'true');

        expect(item).toHaveStyleRule('background', undefined);

        expect(text).toHaveStyleRule(
          'color',
          colors.interactive.disabled__text.rgba
        );
        expect(text).toHaveStyleRule('font-weight: 500');

        expect(text).toHaveStyleRule(
          `color: ${colors.interactive.disabled__text.rgba}`
        );
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
      test('Default', () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');

        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyle(
          `border-bottom: 1px solid ${colors.ui.background__medium.rgba}`
        );
        expect(item).toHaveStyleRule('outline', undefined);

        expect(item).toHaveStyleRule('background', undefined);

        expect(text).not.toBeInTheDocument();
      });

      test('Hover', () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__hover_alt.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });
        expect(item).toHaveStyleRule('outline', undefined, {
          modifier: ':hover',
        });

        expect(text).not.toBeInTheDocument();
      });

      test('Selected', () => {
        const props = fakeProps(true);
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyle(
          `border-bottom: 1px solid ${colors.ui.background__medium.rgba}`
        );
        expect(item).toHaveStyle(
          `background: ${colors.interactive.primary__selected_highlight.rgba}`
        );
        expect(item).toHaveStyleRule('outline', undefined);

        expect(text).not.toBeInTheDocument();
      });

      test('Selected + Hover', async () => {
        const props = fakeProps(true);
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        const text = screen.queryByText(props.name);

        const user = userEvent.setup();
        await user.hover(item);

        testBaseStyles();

        expect(item).not.toHaveStyleRule(
          'border-bottom',
          `1px solid ${colors.ui.background__medium.rgba}`,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule(
          'background',
          colors.interactive.primary__selected_hover.rgba,
          { modifier: ':hover' }
        );
        expect(item).toHaveStyleRule('outline', undefined, {
          modifier: ':hover',
        });
        expect(item).toHaveStyleRule('cursor', 'pointer', {
          modifier: ':hover',
        });

        expect(text).not.toBeInTheDocument();
      });

      test('Focus', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        const text = screen.queryByText(props.name);

        const user = userEvent.setup();
        await user.tab();

        expect(item).toHaveFocus();

        testBaseStyles();

        expect(text).not.toBeInTheDocument();
      });

      test('Disabled', () => {
        const props = fakeProps();
        render(<MenuItem {...props} disabled />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveAttribute('aria-disabled', 'true');
        expect(item).toHaveStyleRule('background', undefined);

        expect(text).not.toBeInTheDocument();
      });
    });
  });
});
