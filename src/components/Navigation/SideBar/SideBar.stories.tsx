import { dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import SideBarProvider from '../../../providers/SideBarProvider';
import { MenuItemType } from './MenuItem';
import SideBar from '.';

export default {
  title: 'Navigation/SideBar',
  body: `
    Supports not having a create action if it isn't needed. Saves current open-state to localStorage with: 'amplify-sidebar-state: boolean'.
   
  `,
  component: SideBar,
  argTypes: {
    hasCreateButton: { control: 'boolean' },
    disabledCreateButton: { control: 'boolean' },
    createLabel: { control: 'text' },
    disabledItem: {
      control: 'select',
      options: ['none', 'dashboard', 'history', 'favourites'],
    },
  },
  args: {
    hasCreateButton: true,
    disabledCreateButton: false,
    createLabel: 'Create story',
    disabledItem: 'none',
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const menuItems: MenuItemType[] = [
    {
      name: 'Dashboard',
      icon: dashboard,
      link: 'dashboard',
      onClick: () => console.log('going to dashboard...'),
    },
    {
      name: 'history',
      icon: history,
      link: 'history',
      onClick: () => console.log('going to history...'),
    },
    {
      name: 'favourites',
      icon: favorite_outlined,
      link: 'favourites',
      onClick: () => console.log('going to favourites...'),
    },
  ];

  return (
    <SideBarProvider>
      <div style={{ display: 'flex', height: '95vh' }}>
        <SideBar
          createLabel={args.hasCreateButton && args.createLabel}
          onCreate={
            args.hasCreateButton ? () => console.log('Created 🖋') : undefined
          }
          createDisabled={args.disabledCreateButton}
        >
          {menuItems.map((m) => (
            <SideBar.Item
              key={m.name}
              {...m}
              disabled={
                args.disabledItem !== 'none' && m.link === args.disabledItem
              }
            />
          ))}
        </SideBar>
      </div>
    </SideBarProvider>
  );
};
