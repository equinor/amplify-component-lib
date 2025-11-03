import { Meta, StoryObj } from '@storybook/react-vite';

import { GenericError } from './GenericError';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof GenericError> = {
  title: 'Organisms/Status/Collections/GenericError',
  component: GenericError,
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
type Story = StoryObj<typeof GenericError>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Test that back button is present by default
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Custom Error Title',
    description: 'This is a custom error description for testing.',
  },
  play: async ({ canvas }) => {
    // Test custom title and description are rendered
    await expect(canvas.getByText('Custom Error Title')).toBeVisible();
    await expect(
      canvas.getByText('This is a custom error description for testing.')
    ).toBeVisible();

    // Test that back button is present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithFallbackUrl: Story = {
  args: {
    title: 'Connection Error',
    description:
      'Unable to connect to the service. Will redirect to home if no history.',
    redirectFallbackUrl: '/home',
  },
  play: async ({ canvas }) => {
    // Test that component renders with fallback URL prop
    await expect(canvas.getByText('Connection Error')).toBeVisible();
    await expect(
      canvas.getByText(/Will redirect to home if no history/)
    ).toBeVisible();

    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithCustomCallback: Story = {
  args: {
    title: 'Authentication Error',
    description: 'Session expired. Please log in again.',
    onBackClick: fn(),
  },
  play: async ({ canvas, args }) => {
    // Test content is rendered
    await expect(canvas.getByText('Authentication Error')).toBeVisible();
    await expect(
      canvas.getByText('Session expired. Please log in again.')
    ).toBeVisible();

    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();

    // Test that custom callback is called when button is clicked
    await userEvent.click(backButton);
    await expect(args.onBackClick).toHaveBeenCalledTimes(1);
  },
};

export const HiddenBackButton: Story = {
  args: {
    title: 'Maintenance Mode',
    description:
      'System is currently under maintenance. Please check back later.',
    hideBackButton: true,
  },
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(canvas.getByText('Maintenance Mode')).toBeVisible();
    await expect(
      canvas.getByText(
        'System is currently under maintenance. Please check back later.'
      )
    ).toBeVisible();

    // Test that back button is NOT present
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};

export const EmptyState: Story = {
  args: {
    hideBackButton: true,
  },
  play: async ({ canvas }) => {
    // Test that component renders even without title/description
    // Should only contain the Status wrapper, no visible text content
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};
