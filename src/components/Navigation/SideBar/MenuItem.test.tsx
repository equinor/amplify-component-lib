import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import MenuItem, { MenuItemProps } from './MenuItem';
import SideBarProvider from 'src/providers/SideBarProvider';
import { spacings } from 'src/style';
import { render, screen, userEvent } from 'src/tests/test-utils';
const { colors } = tokens;

type MenuClickHandler = () => void | React.MouseEventHandler<HTMLAnchorElement>;

function fakeProps(): MenuItemProps {
  return {
    currentUrl: faker.internet.url(),
    link: '/page1',
    icon: home,
    name: faker.person.jobTitle(),
    onClick: vi.fn() as MenuClickHandler,
  };
}

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
    expect(item).toHaveStyleRule('text-decoration', 'none', {
      modifier: ':hover',
    });
    expect(item).toHaveStyleRule('text-decoration', 'none', {
      modifier: ':focus',
    });

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
        expect(item).toHaveStyleRule('outline', undefined);
        expect(item).toHaveStyleRule('background', undefined);

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

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.text.static_icons__default.rgba
        // );
      });

      test('Selected', () => {
        const props = fakeProps();
        render(<MenuItem {...props} currentUrl={props.link} />, {
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

      test('Selected + Hover', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} currentUrl={props.link} />, {
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

        expect(item).toHaveStyleRule(
          'outline',
          `1px dashed ${colors.interactive.primary__resting.rgba}`,
          { modifier: ':focus' }
        );
        expect(item).toHaveStyleRule('background', undefined, {
          modifier: ':focus',
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
        expect(item).toHaveStyleRule(
          'outline',
          `1px dashed ${colors.interactive.primary__resting.rgba}`,
          { modifier: ':focus' }
        );
        expect(item).toHaveStyleRule('background', undefined);

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.disabled__text.rgba
        // );

        expect(text).toHaveStyleRule(
          'color',
          colors.interactive.disabled__text.rgba
        );
        expect(text).toHaveStyleRule('font-weight', '500');

        const user = userEvent.setup();
        await user.hover(item);

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.disabled__text.rgba
        // );
        expect(text).toHaveStyleRule(
          'color',
          colors.interactive.disabled__text.rgba
        );
      });
    });

    describe('Interaction', () => {
      describe('Default', () => {
        test('Should be able to Click', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).toHaveBeenCalledOnce();
        });

        test('Should be able to Tab + Enter', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).toHaveBeenCalledOnce();
        });
      });

      describe('Selected', () => {
        test('Click should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} currentUrl={props.link} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).not.toHaveBeenCalled();
        });

        test('Tab + Enter should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} currentUrl={props.link} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).not.toHaveBeenCalled();
        });
      });

      describe('Disabled', () => {
        test('Click should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} disabled />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).not.toHaveBeenCalled();
        });

        test('Tab + Enter should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} disabled />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).not.toHaveBeenCalled();
        });
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

        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'border-bottom',
          `1px solid ${colors.ui.background__medium.rgba}`
        );
        expect(item).toHaveStyleRule('outline', undefined);
        expect(item).toHaveStyleRule('background', undefined);

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.primary__resting.rgba
        // );

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
        const props = fakeProps();
        render(<MenuItem {...props} currentUrl={props.link} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.queryByText(props.name);

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

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.primary__resting.rgba
        // );

        expect(text).not.toBeInTheDocument();
      });

      test('Selected + Hover', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} currentUrl={props.link} />, {
          wrapper: wrapper,
        });

        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
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

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.primary__resting.rgba
        // );

        expect(text).not.toBeInTheDocument();
      });

      test('Focus', async () => {
        const props = fakeProps();
        render(<MenuItem {...props} />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.queryByText(props.name);

        const user = userEvent.setup();
        await user.tab();

        expect(item).toHaveFocus();

        testBaseStyles();

        expect(item).toHaveStyleRule(
          'outline',
          `1px dashed ${colors.interactive.primary__resting.rgba}`,
          { modifier: ':focus' }
        );
        expect(item).toHaveStyleRule('background', undefined, {
          modifier: ':focus',
        });

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.primary__resting.rgba
        // );

        expect(text).not.toBeInTheDocument();
      });

      test('Disabled', () => {
        const props = fakeProps();
        render(<MenuItem {...props} disabled />, {
          wrapper: wrapper,
        });
        const item = screen.getByTestId('sidebar-menu-item');
        //const svgPath = screen.getByTestId('eds-icon-path');
        const text = screen.queryByText(props.name);

        testBaseStyles();

        expect(item).toHaveAttribute('aria-disabled', 'true');
        expect(item).toHaveStyleRule(
          'outline',
          `1px dashed ${colors.interactive.primary__resting.rgba}`,
          { modifier: ':focus' }
        );
        expect(item).toHaveStyleRule('background', undefined);

        // expect(svgPath.parentElement).toHaveAttribute(
        //   'fill',
        //   colors.interactive.disabled__text.rgba
        // );

        expect(text).not.toBeInTheDocument();
      });
    });

    describe('Interaction', () => {
      describe('Default', () => {
        test('Should be able to Click', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).toHaveBeenCalledOnce();
        });

        test('Should be able to Tab + Enter', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).toHaveBeenCalledOnce();
        });
      });

      describe('Selected', () => {
        test('should not register click event if url is partially the same', async () => {
          const props = fakeProps();
          render(
            <MenuItem
              {...props}
              currentUrl={`${props.link}/${faker.airline.aircraftType()}`}
            />,
            {
              wrapper: wrapper,
            }
          );
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).not.toHaveBeenCalled();
        });
        test('should register click event if url is partially the same when replace is set to true', async () => {
          const props = fakeProps();
          render(
            <MenuItem
              {...props}
              currentUrl={`${props.link}/${faker.airline.aircraftType()}`}
              replace
            />,
            {
              wrapper: wrapper,
            }
          );
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).toHaveBeenCalled();
        });

        test('Tab + Enter should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} currentUrl={props.link} />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).not.toHaveBeenCalled();
        });
      });

      describe('Disabled', () => {
        test('Click should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} disabled />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.click(item);

          expect(props.onClick).not.toHaveBeenCalled();
        });

        test('Tab + Enter should do nothing', async () => {
          const props = fakeProps();
          render(<MenuItem {...props} disabled />, {
            wrapper: wrapper,
          });
          const item = screen.getByTestId('sidebar-menu-item');

          const user = userEvent.setup();
          await user.tab();

          expect(item).toHaveFocus();

          await user.keyboard('[Enter]');

          expect(props.onClick).not.toHaveBeenCalled();
        });
      });
    });
  });
});
