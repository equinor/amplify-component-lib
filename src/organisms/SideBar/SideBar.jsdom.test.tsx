import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { home, star_half } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBar } from 'src/organisms/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

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

test('Renders closed on initial render', () => {
  render(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: wrapper,
    }
  );

  expect(screen.getByTestId('sidebar')).toHaveStyle('width: 64px');
});

test('Renders open width when localStorage has it set to open', () => {
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: true })
  );
  render(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: wrapper,
    }
  );
  expect(screen.getByTestId('sidebar')).toHaveStyle('width: 231px');
});

test('Opens and closes when pressing the toggle button', async () => {
  window.localStorage.setItem(
    'amplify-sidebar-state',
    JSON.stringify({ isOpen: false })
  );
  render(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    { wrapper: wrapper }
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
  render(
    <SideBar createLabel={createLabel} onCreate={handleOnCreate}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    { wrapper: wrapper }
  );
  const user = userEvent.setup();

  expect(screen.queryByText(createLabel)).not.toBeInTheDocument();

  const toggleButton = screen.getAllByRole('button').at(-1)!;

  await user.click(toggleButton);

  expect(screen.getByText(createLabel)).toBeInTheDocument();
  const createButton = screen.getAllByRole('button')[0];
  expect(createButton).toHaveStyle('height: 36px');
});
