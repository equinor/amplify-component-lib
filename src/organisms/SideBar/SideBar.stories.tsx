import {
  add,
  car,
  dashboard,
  favorite_outlined,
  history,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useLocation } from '@tanstack/react-router';

import { SideBar } from '.';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';

import { expect, screen, userEvent, waitFor } from 'storybook/test';

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

const searchableMenuItem: SideBarMenuItem = {
  name: 'Favourites',
  icon: favorite_outlined,
  isSearchable: true,
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
      name: 'Archived favourites',
      to: '/archived-favourites',
      disabled: true,
    },
  ],
};

const SearchableSubmenuComponent = () => {
  const { pathname } = useLocation();
  return (
    <SideBarProvider>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideBar>
          <SideBar.Item {...searchableMenuItem} />
        </SideBar>
        <output aria-label="Current route">{pathname}</output>
      </div>
    </SideBarProvider>
  );
};

const exerciseSearchableSubmenu = async (isOpen: boolean) => {
  const parent = screen.getByRole('button', { name: 'Favourites' });
  await userEvent.click(parent);
  const search = await screen.findByRole('searchbox', {
    name: 'Search Favourites',
  });
  const itemRole = isOpen ? 'link' : 'menuitem';
  const parentBackground = window.getComputedStyle(parent).backgroundColor;

  await waitFor(() => expect(search).toHaveFocus());
  const firstItem = screen.getByRole(itemRole, { name: 'My favourites' });
  await expect(
    search.compareDocumentPosition(firstItem) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();

  await userEvent.type(search, ' TEAM ');
  await expect(
    screen.queryByRole(itemRole, { name: 'My favourites' })
  ).not.toBeInTheDocument();
  await expect(
    screen.getByRole(itemRole, { name: 'Team favourites' })
  ).toBeInTheDocument();
  await expect(window.getComputedStyle(parent).backgroundColor).toBe(
    parentBackground
  );
  await expect(search).toHaveFocus();

  await userEvent.clear(search);
  await expect(
    screen.getByRole(itemRole, { name: 'My favourites' })
  ).toBeInTheDocument();
  await userEvent.type(search, 'does not exist');
  await expect(
    screen.getByRole('status', { name: 'Search results' })
  ).toHaveTextContent('No matching items');
  await expect(screen.queryAllByRole(itemRole)).toHaveLength(0);

  await userEvent.clear(search);
  await expect(
    screen.queryByRole('status', { name: 'Search results' })
  ).not.toBeInTheDocument();
  await expect(
    screen.getByText('Archived favourites').closest('a')
  ).toHaveAttribute('aria-disabled', 'true');

  if (!isOpen) {
    await userEvent.keyboard('[ArrowDown]');
    await expect(
      screen.getByRole(itemRole, { name: 'My favourites' })
    ).toHaveFocus();
    await userEvent.keyboard('[ArrowDown]');
    await expect(
      screen.getByRole(itemRole, { name: 'Team favourites' })
    ).toHaveFocus();
    await userEvent.keyboard('[ArrowDown]');
    await expect(
      screen.getByRole(itemRole, { name: 'My favourites' })
    ).toHaveFocus();
    await userEvent.type(search, 'team');
    await userEvent.keyboard('[Escape]');
    await waitFor(() => expect(search).not.toBeInTheDocument());
    await expect(parent).toHaveFocus();
    await userEvent.keyboard('[Enter]');
  } else {
    await userEvent.type(search, 'team');
    await userEvent.click(parent);
    await expect(search).not.toBeInTheDocument();
    await userEvent.click(parent);
  }

  const reopenedSearch = await screen.findByRole('searchbox', {
    name: 'Search Favourites',
  });
  await expect(reopenedSearch).toHaveValue('');
  await userEvent.type(reopenedSearch, 'team');
  const teamItem = screen.getByRole(itemRole, { name: 'Team favourites' });
  if (isOpen) {
    await userEvent.click(teamItem);
  } else {
    await userEvent.keyboard('[ArrowUp]');
    await expect(teamItem).toHaveFocus();
    await userEvent.keyboard('[Enter]');
  }
  await waitFor(() =>
    expect(
      screen.getByRole('status', { name: 'Current route' })
    ).toHaveTextContent('/team-favourites')
  );
  if (!isOpen) await expect(reopenedSearch).not.toBeInTheDocument();
};

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

export const SearchFieldFirst: Story = {
  render: () => <SearchableSubmenuComponent />,
  parameters: {
    router: { initial: '/my-favourites', routes: ['$'] },
  },
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({
        isOpen: false,
      })
    );
  },
  play: async () => exerciseSearchableSubmenu(false),
};

export const SearchableExpanded: Story = {
  ...SearchFieldFirst,
  beforeEach: () => {
    window.localStorage.setItem(
      'amplify-sidebar-state',
      JSON.stringify({ isOpen: true })
    );
  },
  play: async () => exerciseSearchableSubmenu(true),
};

export const TestNonSearchableSubmenu: Story = {
  tags: ['test-only'],
  render: () => (
    <SideBarProvider>
      <SideBar>
        <SideBar.Item {...searchableMenuItem} isSearchable={false} />
      </SideBar>
    </SideBarProvider>
  ),
  beforeEach: SearchFieldFirst.beforeEach,
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Favourites' }));
    await expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    await expect(
      screen.getByRole('menuitem', { name: 'My favourites' })
    ).toBeInTheDocument();
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
