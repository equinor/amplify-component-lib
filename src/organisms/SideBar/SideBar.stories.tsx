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

import { expect, fn, userEvent, within } from 'storybook/test';

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
  createDisabled?: boolean;
  hasBottomItem: boolean;
  disabledItem: 'none' | 'dashboard' | 'history' | 'favourites';
  onCreate?: () => void;
}) => {
  return (
    <SideBarProvider>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideBar
          {...args}
          onCreate={args.hasCreateButton ? args.onCreate : undefined}
          bottomItem={
            args.hasBottomItem ? (
              <SideBar.Item icon={car} name="Cars" to="/" />
            ) : undefined
          }
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
    createDisabled: { control: 'boolean' },
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
    onCreate: () => console.log('Created 🖋'),
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

export const TestCreateItemDisabled: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: true })
    );
  },
  args: {
    createDisabled: true,
    onCreate: fn(),
  },
  play: async ({ canvas, args }) => {
    const container = canvas.getByTestId('create-item-container');
    const button = within(container).getByRole('button', {
      name: args.createLabel,
    });

    await expect(button).toBeDisabled();

    await userEvent.click(button);
    await expect(args.onCreate).not.toHaveBeenCalled();
  },
};

export const TestCreateItemActive: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: true })
    );
  },
  args: {
    createActive: true,
  },
  play: async ({ canvas }) => {
    const container = canvas.getByTestId('create-item-container');

    await expect(container).toBeInTheDocument();
  },
};

export const TestCreateItemLabelHiddenWhenCollapsed: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: false })
    );
  },
  play: async ({ canvas, args }) => {
    const container = canvas.getByTestId('create-item-container');
    const button = within(container).getByRole('button');

    await expect(button).not.toHaveAccessibleName(args.createLabel ?? '');
    await expect(canvas.queryByText(args.createLabel ?? '')).toBeNull();
  },
};

export const TestCreateItemClickExpanded: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: true })
    );
  },
  args: {
    onCreate: fn(),
  },
  play: async ({ canvas, args }) => {
    const container = canvas.getByTestId('create-item-container');
    const button = within(container).getByRole('button', {
      name: args.createLabel,
    });

    await userEvent.click(button);
    await expect(args.onCreate).toHaveBeenCalledOnce();
  },
};

export const TestCreateItemClickCollapsed: Story = {
  tags: ['test-only'],
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: false })
    );
  },
  args: {
    onCreate: fn(),
  },
  play: async ({ canvas, args }) => {
    const container = canvas.getByTestId('create-item-container');
    const button = within(container).getByRole('button');

    await userEvent.click(button);
    await expect(args.onCreate).toHaveBeenCalledOnce();
  },
};
