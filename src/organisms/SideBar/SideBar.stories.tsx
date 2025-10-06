import {
  add,
  car,
  dashboard,
  favorite_outlined,
  history,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { SideBar } from '.';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';

import { expect } from 'storybook/test';

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

const StoryComponent = (args: {
  hasCreateButton: boolean;
  createLabel: string;
  createActive?: boolean;
  hasBottomItem: boolean;
  disabledItem: 'none' | 'dashboard' | 'history' | 'favourites';
}) => {
  return (
    <SideBarProvider>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideBar
          onCreate={
            args.hasCreateButton ? () => console.log('Created 🖋') : undefined
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
                args.disabledItem !== 'none' && m.name === args.disabledItem
              }
              {...m}
            />
          ))}
        </SideBar>
      </div>
    </SideBarProvider>
  );
};

const meta: Meta = {
  title: 'Organisms/SideBar',
  component: StoryComponent,
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
    router: {
      initialEntries: ['/'],
      routes: ['$'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Primary: Story = {
  args: {
    hasCreateButton: true,
    createLabel: 'Create story',
  },
  play: async ({ canvas }) => {
    const createIcon = canvas.getAllByTestId('eds-icon-path')[0]; // First icon is create icon
    await expect(createIcon).toHaveAttribute('d', add.svgPathData);
  },
};
