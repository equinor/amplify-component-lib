import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import { SideBar } from '.';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';

const meta: Meta = {
  title: 'Organisms/SideBar',
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
};

export default meta;

export const Primary: StoryFn = (args) => {
  const menuItems: SideBarMenuItem[] = [
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
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <SideBarProvider>
              <div style={{ display: 'flex', height: '95vh' }}>
                <SideBar
                  createLabel={
                    (args.hasCreateButton as string) &&
                    (args.createLabel as string)
                  }
                  onCreate={
                    args.hasCreateButton
                      ? () => console.log('Created 🖋')
                      : undefined
                  }
                  createDisabled={args.disabledCreateButton as boolean}
                >
                  {menuItems.map((m, index) => (
                    <SideBar.Item
                      key={m.name}
                      currentUrl={index === 0 ? m.link : undefined}
                      {...m}
                      disabled={
                        args.disabledItem !== 'none' &&
                        m.link === args.disabledItem
                      }
                    />
                  ))}
                </SideBar>
              </div>
            </SideBarProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};
