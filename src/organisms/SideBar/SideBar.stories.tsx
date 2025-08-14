import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { car, dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { SideBar } from '.';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';

const meta: Meta = {
  title: 'Organisms/SideBar',
  component: SideBar,
  argTypes: {
    hasCreateButton: { control: 'boolean' },
    hasBottomItem: { control: 'boolean' },
    createLabel: { control: 'text' },
    createActive: { control: 'boolean' },
    disabledItem: {
      control: 'select',
      options: ['none', 'dashboard', 'history', 'favourites'],
    },
  },
  args: {
    hasCreateButton: true,
    hasBottomItem: true,
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
      name: 'History',
      icon: history,
      link: 'history',
      onClick: () => console.log('going to history...'),
    },
    {
      name: 'Favourites',
      icon: favorite_outlined,
      items: [
        {
          name: 'My favourites',
          link: 'my-favourites',
        },
        {
          name: 'Team favourites',
          link: 'team-favourites',
        },
      ],
    },
    {
      name: 'Cars',
      icon: car,
      link: 'cars',
      onClick: () => console.log('going to favourites...'),
    },
  ];

  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="*"
          element={
            <SideBarProvider>
              <div style={{ display: 'flex', height: '100%' }}>
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
                  bottomItem={
                    args.hasBottomItem ? (
                      <SideBar.Item icon={car} name="Cars" link="/" />
                    ) : undefined
                  }
                  {...args}
                >
                  {menuItems.map((m) => (
                    <SideBar.Item
                      key={m.name}
                      disabled={
                        args.disabledItem !== 'none' &&
                        m.name === args.disabledItem
                      }
                      {...m}
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
