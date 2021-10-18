import React from 'react';
import { render, screen, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import SideBar from '../index';
import { MenuItemType } from '../MenuItem';
import { home, star_half } from '@equinor/eds-icons';

afterEach(cleanup);

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

describe('SideBar', () => {
  it('renders without crashing', () => {
    render(<SideBar menuItems={defaultMenuItems}></SideBar>);
  });

  it('renders create new button when onCreate prop is given', () => {
    render(
      <SideBar
        onCreate={() => console.log('test')}
        createLabel="createlabel"
        open={true}
        menuItems={defaultMenuItems}
      ></SideBar>
    );

    expect(screen.getByText('createlabel')).toBeInTheDocument();
  });

  it('renders correct width when menu is closed', () => {
    render(<SideBar open={false} menuItems={defaultMenuItems}></SideBar>);

    expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '72px' });
  });

  it('renders correct width when menu is open', () => {
    render(<SideBar open={true} menuItems={defaultMenuItems}></SideBar>);

    expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '256px' });
  });
});
