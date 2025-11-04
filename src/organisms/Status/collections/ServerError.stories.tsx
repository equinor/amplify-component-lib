import { Meta, StoryObj } from '@storybook/react-vite';

import { ServerError } from './ServerError';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof ServerError> = {
  title: 'Organisms/Status/Collections/ServerError',
  component: ServerError,
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
type Story = StoryObj<typeof ServerError>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Test that default title is rendered
    await expect(
      canvas.getByText('Something is wrong on our servers')
    ).toBeVisible();

    // Test that default description is rendered
    await expect(
      canvas.getByText(/Our server encountered an unexpected issue/)
    ).toBeVisible();

    // Test that back button is present by default
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const CustomDescription: Story = {
  args: {
    description:
      'Database maintenance is currently in progress. Please try again in a few minutes.',
  },
  play: async ({ canvas }) => {
    // Test custom description is rendered
    await expect(
      canvas.getByText(
        'Database maintenance is currently in progress. Please try again in a few minutes.'
      )
    ).toBeVisible();

    // Test that back button is still present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithFallbackUrl: Story = {
  args: {
    redirectFallbackUrl: '/status',
    description: 'Server error - will redirect to status page if no history.',
  },
  play: async ({ canvas }) => {
    // Test that component renders with fallback URL prop
    await expect(
      canvas.getByText(
        'Server error - will redirect to status page if no history.'
      )
    ).toBeVisible();

    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithCustomCallback: Story = {
  args: {
    onBackClick: fn(),
    description: 'Server error - uses custom navigation callback.',
  },
  play: async ({ canvas, args }) => {
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();

    // Test that custom callback is called when button is clicked
    await userEvent.click(backButton);
    await expect(args.onBackClick).toHaveBeenCalledTimes(1);
  },
};

export const HiddenBackButton: Story = {
  args: {
    hideBackButton: true,
    description: 'Server temporarily unavailable - no navigation available.',
  },
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(
      canvas.getByText('Something is wrong on our servers')
    ).toBeVisible();
    await expect(
      canvas.getByText(
        'Server temporarily unavailable - no navigation available.'
      )
    ).toBeVisible();

    // Test that back button is NOT present
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};
