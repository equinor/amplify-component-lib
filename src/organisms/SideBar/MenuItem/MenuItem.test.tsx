import { MouseEventHandler, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home, shopping_basket } from '@equinor/eds-icons';
import { FeatureToggleProvider } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import { SideBarMenuItem } from 'src/atoms';
import {
  MenuItem,
  MenuItemProps,
} from 'src/organisms/SideBar/MenuItem/MenuItem';
import { AuthProvider, LoadingProvider } from 'src/providers';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';
import { FAKE_FEATURE_TOGGLES } from 'src/tests/mockHandlers';

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
            <Route path="/cat" element={<p>cat</p>} />
            <Route path="/dog" element={<p>dog</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </SideBarProvider>
  );
};

const featureTestWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FeatureToggleProvider>
          <LoadingProvider>
            <SideBarProvider>
              <MemoryRouter initialEntries={['/']}>
                <Routes>
                  <Route path="/" element={children} />
                  <Route path="/page1" element={children} />
                </Routes>
              </MemoryRouter>
            </SideBarProvider>
          </LoadingProvider>
        </FeatureToggleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should navigate if replace is set to true and url is a partial match', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} replace />, {
    wrapper: wrapper,
  });
  const user = userEvent.setup();

  expect(screen.getByText(/page 1/i)).toBeInTheDocument();

  await user.click(screen.getByTestId('sidebar-menu-item'));

  expect(screen.getByText(/page 2/i)).toBeInTheDocument();
  expect(props.onClick).toHaveBeenCalledOnce();
});

test('should hide if featureUuid is not in my features', () => {
  const props = fakeProps();
  const someRandomUuid = faker.string.uuid();
  render(<MenuItem {...props} featureUuid={someRandomUuid} />, {
    wrapper: featureTestWrapper,
  });

  expect(screen.queryByTestId('sidebar-menu-item')).not.toBeInTheDocument();
});

test('should show if featureUuid is in my features', async () => {
  const props = fakeProps();
  render(<MenuItem {...props} featureUuid={FAKE_FEATURE_TOGGLES[0].uuid} />, {
    wrapper: featureTestWrapper,
  });
  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 5000,
  });

  expect(screen.getByTestId('sidebar-menu-item')).toBeInTheDocument();
});

describe.each(['expanded', 'collapsed'])('MenuItem - sidebar %s', (state) => {
  beforeEach(() => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: state === 'expanded' })
    );
  });

  describe('Default', () => {
    test('Should show tooltip when hovering', async () => {
      const props = fakeProps();
      render(<MenuItem {...props} />, {
        wrapper: wrapper,
      });
      const user = userEvent.setup();
      const item = screen.getByTestId('sidebar-menu-item');

      await user.hover(item);

      const text = await screen.findByText(props.name);
      expect(text).toBeInTheDocument();
    });

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
      const props = fakeProps(true);
      render(<MenuItem {...props} />, {
        wrapper: wrapper,
      });
      const item = screen.getByTestId('sidebar-menu-item');

      const user = userEvent.setup();
      await user.click(item);

      expect(props.onClick).not.toHaveBeenCalled();
    });

    test('Tab + Enter should do nothing', async () => {
      const props = fakeProps(true);
      render(<MenuItem {...props} />, {
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

  describe('Collapsable', () => {
    test('Able open and select sub page', async () => {
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

      render(<MenuItem {...props} />, {
        wrapper: wrapper,
      });

      const user = userEvent.setup();

      await user.click(screen.getByRole('button'));

      for (const item of props.items) {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      }

      const randomItem = faker.helpers.arrayElement(props.items);
      const itemText = screen.getByText(randomItem.name);
      await user.click(itemText);

      if (state === 'collapsed') {
        expect(itemText).not.toBeInTheDocument();
      }

      expect(
        screen.getByText(randomItem.link.replace('/', ''))
      ).toBeInTheDocument();
    });
  });
});
