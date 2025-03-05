import { MouseEventHandler, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home } from '@equinor/eds-icons';
import { FeatureToggleProvider } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import {
  MenuItem,
  MenuItemProps,
} from 'src/organisms/SideBar/MenuItem/MenuItem';
import { AuthProvider, LoadingProvider } from 'src/providers';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';
import { FAKE_FEATURE_TOGGLES } from 'src/tests/mockHandlers';

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
    <SideBarProvider>
      <MemoryRouter initialEntries={['/page2']}>
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
  render(<MenuItem {...props} replace currentUrl={props.link + '/hei'} />, {
    wrapper: wrapper,
  });
  const user = userEvent.setup();

  expect(screen.getByText(/page 2/i)).toBeInTheDocument();

  await user.click(screen.getByTestId('sidebar-menu-item'));

  expect(screen.getByText(/page 1/i)).toBeInTheDocument();
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

describe.each(['expanded', 'collapsed'])('MenuItem %s', (state) => {
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
