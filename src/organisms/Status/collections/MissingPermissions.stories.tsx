import { Meta, StoryObj } from '@storybook/react-vite';

import { MissingPermissions } from './MissingPermissions';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof MissingPermissions> = {
  title: 'Organisms/Status/Collections/MissingPermissions',
  component: MissingPermissions,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  args: {},
  decorators: (Story) => (
    <StatusWrapper>
      <Story />
    </StatusWrapper>
  ),
};

export default meta;
type Story = StoryObj<typeof MissingPermissions>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Test that default title is rendered
    await expect(
      canvas.getByText(
        "It looks like you don't have permission to access this page."
      )
    ).toBeVisible();

    // Test that back button is present by default
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const CustomTitleAndDescription: Story = {
  args: {
    title: 'Access Denied',
    description:
      'You need admin privileges to view this content. Please contact your administrator.',
  },
  play: async ({ canvas }) => {
    // Test custom title and description are rendered
    await expect(canvas.getByText('Access Denied')).toBeVisible();
    await expect(
      canvas.getByText(
        'You need admin privileges to view this content. Please contact your administrator.'
      )
    ).toBeVisible();

    // Test that back button is present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithCustomCallback: Story = {
  args: {
    title: 'Insufficient Permissions',
    description: 'Contact support for access.',
    onBackClick: fn(),
  },
  play: async ({ canvas, args }) => {
    // Test content is rendered
    await expect(canvas.getByText('Insufficient Permissions')).toBeVisible();

    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();

    // Test that custom callback is called when button is clicked
    await userEvent.click(backButton);
    await expect(args.onBackClick).toHaveBeenCalledTimes(1);
  },
};

export const HiddenBackButton: Story = {
  args: {
    title: 'Restricted Area',
    description: 'This area is restricted and no navigation is available.',
    hideBackButton: true,
  },
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(canvas.getByText('Restricted Area')).toBeVisible();
    await expect(
      canvas.getByText(
        'This area is restricted and no navigation is available.'
      )
    ).toBeVisible();

    // Test that back button is NOT present
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Permission Required',
    // No description prop - should not render description element
  },
  play: async ({ canvas }) => {
    // Test that title is rendered
    await expect(canvas.getByText('Permission Required')).toBeVisible();

    // Test that back button is present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();

    // Note: We can't easily test that description is NOT rendered
    // without more specific test-ids, but the conditional rendering logic is covered
  },
};
