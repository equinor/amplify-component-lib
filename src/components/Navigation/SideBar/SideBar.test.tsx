import React from 'react';

import { add, home, star_half } from '@equinor/eds-icons';

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

  expect(screen.getByTestId('sidebar').getAttribute('width')).toBe('72px');
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
  expect(screen.getByTestId('sidebar')).toHaveStyle({ width: '256px' });
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

test('Disabled menu item doesnt fire event', async () => {
  render(
    <SideBar>
      {defaultMenuItems.map((m, index) => (
        <SideBar.Item key={m.name} {...m} disabled={index === 0} />
      ))}
    </SideBar>,
    {
      wrapper: SideBarProvider,
    }
  );

  const user = userEvent.setup();

  const firstMenuItem = screen.getAllByTestId('sidebar-menu-item')[0];
  await user.click(firstMenuItem);

  expect(defaultMenuItems[0].onClick).not.toHaveBeenCalled();
});
