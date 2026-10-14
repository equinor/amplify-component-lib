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
import { colors } from 'src/atoms/style';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBarProvider } from 'src/providers/SideBarProvider';

import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

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

const SearchableSubmenuComponent = ({
  menuItem = searchableMenuItem,
}: {
  menuItem?: SideBarMenuItem;
}) => {
  const { href } = useLocation();
  return (
    <SideBarProvider>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideBar>
          <SideBar.Item {...menuItem} />
        </SideBar>
        <output aria-label="Current route">{href}</output>
      </div>
    </SideBarProvider>
  );
};

const resolveBackground = (element: HTMLElement, background: string) => {
  const probe = document.createElement('div');
  probe.style.background = background;
  element.appendChild(probe);
  const resolved = window.getComputedStyle(probe).backgroundColor;
  probe.remove();
  return resolved;
};

// The real cursor can rest on the parent in CI and apply :hover at any point,
// so check for the active colour matching the current hover state.
const expectActiveParentBackground = async (parent: HTMLElement) => {
  await waitFor(() => {
    expect(parent.getAnimations()).toHaveLength(0);
    expect(window.getComputedStyle(parent).backgroundColor).toBe(
      resolveBackground(
        parent,
        parent.matches(':hover')
          ? colors.interactive.primary__selected_hover.rgba
          : colors.interactive.primary__selected_highlight.rgba
      )
    );
  });
};

const exerciseSearchableSubmenu = async (isOpen: boolean) => {
  const parent = screen.getByRole('button', { name: 'Favourites' });
  await userEvent.click(parent);
  const search = await screen.findByRole('searchbox', {
    name: 'Search Favourites',
  });
  const itemRole = isOpen ? 'link' : 'menuitem';
  await expectActiveParentBackground(parent);

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
  await expectActiveParentBackground(parent);
  await expect(search).toHaveFocus();
  if (!isOpen) {
    await userEvent.keyboard('[Home][End]');
    await expect(search).toHaveFocus();
    await expect(search).toHaveValue(' TEAM ');
  }

  await userEvent.clear(search);
  await expect(
    screen.getByRole(itemRole, { name: 'My favourites' })
  ).toBeInTheDocument();
  await userEvent.type(search, 'does not exist');
  await expect(
    screen.getByRole('status', { name: 'Search results' })
  ).toHaveTextContent('No matching items');
  await expect(screen.queryAllByRole(itemRole)).toHaveLength(0);
  if (!isOpen) {
    await userEvent.keyboard('[ArrowDown][ArrowUp]');
    await expect(search).toHaveFocus();
  }

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
    await userEvent.keyboard('[ArrowUp]');
    await expect(
      screen.getByRole(itemRole, { name: 'Team favourites' })
    ).toHaveFocus();
    await userEvent.keyboard('[Home]');
    await expect(
      screen.getByRole(itemRole, { name: 'My favourites' })
    ).toHaveFocus();
    await userEvent.keyboard('[End]');
    await expect(
      screen.getByRole(itemRole, { name: 'Team favourites' })
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

export const TestSearchableLocationChanges: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    router: { initial: '/dashboard', routes: ['$'] },
  },
  beforeEach: SearchFieldFirst.beforeEach,
  render: () => (
    <SearchableSubmenuComponent
      menuItem={{
        ...searchableMenuItem,
        items: [
          {
            name: 'Filtered dashboard',
            to: '/dashboard',
            search: { view: 'filtered' },
          },
          {
            name: 'Dashboard section',
            to: '/dashboard',
            search: true,
            hash: 'details',
          },
        ],
      }}
    />
  ),
  play: async () => {
    const parent = screen.getByRole('button', { name: 'Favourites' });
    const currentRoute = screen.getByRole('status', { name: 'Current route' });

    await userEvent.click(parent);
    const search = await screen.findByRole('searchbox', {
      name: 'Search Favourites',
    });
    await userEvent.click(
      screen.getByRole('menuitem', { name: 'Filtered dashboard' })
    );
    await waitFor(() =>
      expect(currentRoute).toHaveTextContent('view=filtered')
    );
    await waitFor(() => expect(search).not.toBeInTheDocument());
    await expect(parent).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(parent);
    const reopenedSearch = await screen.findByRole('searchbox', {
      name: 'Search Favourites',
    });
    await userEvent.click(
      screen.getByRole('menuitem', { name: 'Dashboard section' })
    );
    await waitFor(() => expect(currentRoute).toHaveTextContent('#details'));
    await expect(currentRoute).toHaveTextContent('view=filtered');
    await waitFor(() => expect(reopenedSearch).not.toBeInTheDocument());
    await expect(parent).toHaveAttribute('aria-expanded', 'false');
  },
};

export const TestNonSearchableSubmenu: Story = {
  tags: ['!dev', '!autodocs'],
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
  tags: ['!dev', '!autodocs'],
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
  tags: ['!dev', '!autodocs'],
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

    // Resolved value of colors.interactive.primary__selected_highlight in
    // the default (light) theme.
    await expect(getComputedStyle(container).backgroundColor).toBe(
      'rgb(230, 250, 236)'
    );
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
