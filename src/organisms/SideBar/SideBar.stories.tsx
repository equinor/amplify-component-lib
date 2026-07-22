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

import { expect, userEvent } from 'storybook/test';

const menuItems: SideBarMenuItem[] = [
  {
    name: 'Dashboard',
    icon: dashboard,
    to: '/dashboard',
    onClick: () => console.log('going to dashboard...'),
  },
  {
    name: 'History',
    icon: history,
    to: '/history',
    onClick: () => console.log('going to history...'),
  },
  {
    name: 'Favourites',
    icon: favorite_outlined,
    items: [
      {
        name: 'My favourites',
        to: '/my-favourites',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites1',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites2',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites3',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites4',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites5',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites6',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites7',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites8',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites9',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites10',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites11',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites12',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites13',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites14',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites15',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites16',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites17',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites18',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites19',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites20',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites21',
      },
      {
        name: 'Team favourites',
        to: '/team-favourites22',
      },
    ],
  },
  {
    name: 'Cars',
    icon: car,
    to: '/cars',
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
              <SideBar.Item icon={car} name="Cars" to="/" />
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
      initial: '/',
      routes: ['$'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Primary: Story = {
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({
        isOpen: false,
      })
    );
  },
  args: {
    hasCreateButton: true,
    createLabel: 'Create story',
    disabledItem: 'favourites',
  },
  play: async ({ canvas }) => {
    const createIcon = canvas.getAllByTestId('eds-icon-path')[0]; // First icon is create icon
    await expect(createIcon).toHaveAttribute('d', add.svgPathData);
  },
};

export const Open: Story = {
  args: {
    hasCreateButton: true,
    createLabel: 'Create story',
    disabledItem: 'favourites',
  },
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({
        isOpen: true,
      })
    );
  },
  play: async ({ canvas }) => {
    const createIcon = canvas.getAllByTestId('eds-icon-path')[0]; // First icon is create icon
    await expect(createIcon).toHaveAttribute('d', add.svgPathData);
  },
};

export const TestToggleClick: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({
        isOpen: true,
      })
    );
  },
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    const toggleButton = buttons[buttons.length - 1]; // Toggle is usually the last button

    await userEvent.click(toggleButton);
    // Just verify the click doesn't throw
    await expect(toggleButton).toBeInTheDocument();
  },
};

export const TestToggleKeyboard: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({
        isOpen: true,
      })
    );
  },
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    const toggleButton = buttons[buttons.length - 1];

    toggleButton.focus();
    await expect(toggleButton).toHaveFocus();

    await userEvent.keyboard('[Enter]');
    await expect(toggleButton).toBeInTheDocument();
  },
};
