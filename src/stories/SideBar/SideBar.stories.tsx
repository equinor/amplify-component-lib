import { Story, Meta } from '@storybook/react';

import {
  dashboard,
  favorite_outlined,
  history,
  home,
} from '@equinor/eds-icons';
import SideBar from '../../components/SideBar';
import { MenuItemType } from '../../components/SideBar/MenuItem';

export default {
  title: 'SideBar',
  body: `
    Supports not having a create action if it isn't needed. Saves current open-state to localStorage with: 'amplify-sidebar-state: boolean'.
   
  `,
  component: SideBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const menuItems: MenuItemType[] = [
  {
    name: 'home',
    icon: home,
  },
  {
    name: 'history',
    icon: history,
  },
  {
    name: 'favourites',
    icon: favorite_outlined,
  },
];

export const Primary: Story = () => (
  <div style={{ display: 'flex', height: '95vh' }}>
    <SideBar
      menuItems={menuItems}
      createLabel="Create story"
      onCreate={() => console.log('Created 🖋')}
    />
  </div>
);

export const NoCreateAction: Story = () => (
  <div style={{ display: 'flex', height: '95vh' }}>
    <SideBar menuItems={menuItems} />
  </div>
);

export const WithCreateAction: Story = () => (
  <div style={{ display: 'flex', height: '95vh' }}>
    <SideBar
      menuItems={menuItems}
      createLabel="Create story"
      onCreate={() => console.log('Created 🖋')}
    />
  </div>
);
