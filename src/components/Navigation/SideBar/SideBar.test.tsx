import React from 'react';

import { add, home, star_half } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import SideBarProvider from '../../../providers/SideBarProvider';
import { render, screen, userEvent } from '../../../tests/test-utils';
import { MenuItemType } from './MenuItem';
import SideBar from '.';

const defaultMenuItems: MenuItemType[] = [
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

test('Renders create new button when onCreate prop is given', () => {
  render(
    <SideBar onCreate={() => console.log('test')} createLabel="createlabel">
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: SideBarProvider,
    }
  );
  const createIcon = screen.getAllByTestId('eds-icon-path')[0];
  expect(createIcon).toHaveAttribute('d', add.svgPathData);
});

/*test('Renders dark mode correctly', () => {
  render(
    <SideBar
      theme="dark"
      onCreate={() => console.log('test')}
      createLabel="createlabel"
    >
      {defaultMenuItems.map((m) => (
        <SideBar.Item theme="dark" key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: SideBarProvider,
    }
  );
  const createButton = screen.getAllByRole('button')[0];
  expect(createButton).toHaveStyleRule(
    'background',
    backgroundColor(SidebarTheme.dark)
  );
});*/

test('Renders closed on initial render', () => {
  render(
    <SideBar>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>,
    {
      wrapper: SideBarProvider,
    }
  );

  expect(screen.getByTestId('sidebar')).toHaveStyleRule('width', '72px');
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
      wrapper: SideBarProvider,
    }
  );
  expect(screen.getByTestId('sidebar')).toHaveStyleRule('width', '256px');
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
      wrapper: SideBarProvider,
    }
  );

  const user = userEvent.setup();

  const createNewButton = screen.getByText(/create new/i);
  await user.click(createNewButton);

  expect(createNewFn).not.toHaveBeenCalled();
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
    { wrapper: SideBarProvider }
  );
  const user = userEvent.setup();

  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toHaveStyleRule('width', '72px');

  expect(screen.queryByText('Collapse')).not.toBeInTheDocument();

  const toggleButton = screen.getByRole('button');
  await user.click(toggleButton);

  expect(sidebar).toHaveStyleRule('width', '256px');
  expect(screen.getByText(/collapse/i)).toBeInTheDocument();
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
    { wrapper: SideBarProvider }
  );
  const user = userEvent.setup();

  expect(screen.queryByText(createLabel)).not.toBeInTheDocument();

  const toggleButton = screen.getAllByRole('button')[1];

  await user.click(toggleButton);

  expect(screen.getByText(createLabel)).toBeInTheDocument();
  const createButton = screen.getAllByRole('button')[0];
  expect(createButton).toHaveStyleRule('height', '36px');
});
