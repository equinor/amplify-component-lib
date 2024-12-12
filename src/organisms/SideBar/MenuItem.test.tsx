import { MouseEventHandler, ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { MenuItem, MenuItemProps } from 'src/organisms/SideBar/MenuItem';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

type MenuClickHandler = () => void | MouseEventHandler<HTMLAnchorElement>;

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
