import React from 'react';
import { render, screen } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import SideBar from '..';
import { MenuItemType } from '../MenuItem';
import { home, star_half } from '@equinor/eds-icons';

const defaultMenuItems: MenuItemType[] = [
  {
    name: 'Home',
    icon: home,
  },
  {
    name: 'Another Link',
    icon: star_half,
  },
];

test('Sidebar renders', () => {
  const currentUrl = 'home';
  render(
    <SideBar>
      {defaultMenuItems.map((m) => {
        return <SideBar.Item key={m.name} currentUrl={currentUrl} {...m} />;
      })}
    </SideBar>
  );
});

test('Renders create new button when onCreate prop is given', () => {
  render(
    <SideBar
      onCreate={() => console.log('test')}
      createLabel="createlabel"
      open={true}
    >
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );
  expect(screen.getByText('createlabel')).toBeInTheDocument();
});

test('Renders closed width when closed', () => {
  render(
    <SideBar open={false}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );

  expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '72px' });
});

test('Renders open width when open', () => {
  render(
    <SideBar open={true}>
      {defaultMenuItems.map((m) => (
        <SideBar.Item key={m.name} {...m} />
      ))}
    </SideBar>
  );

  expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '256px' });
});
