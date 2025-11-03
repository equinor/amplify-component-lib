import { Meta, StoryObj } from '@storybook/react-vite';

import { BadRequest } from './BadRequest';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof BadRequest> = {
  title: 'Organisms/Status/Collections/BadRequest',
  component: BadRequest,
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
type Story = StoryObj<typeof BadRequest>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Test that default title is rendered
    await expect(canvas.getByText('Bad request')).toBeVisible();

    // Test that default description is rendered
    await expect(
      canvas.getByText(/We encountered some confusion regarding your request/)
    ).toBeVisible();

    // Test that back button is present by default
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const CustomDescription: Story = {
  args: {
    description:
      'Invalid request format. Please check your input and try again.',
  },
  play: async ({ canvas }) => {
    // Test custom description is rendered
    await expect(
      canvas.getByText(
        'Invalid request format. Please check your input and try again.'
      )
    ).toBeVisible();

    // Test that back button is still present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithCustomCallback: Story = {
  args: {
    onBackClick: fn(),
    description: 'Request validation failed - custom navigation enabled.',
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
    description: 'Request blocked - no navigation options available.',
  },
  play: async ({ canvas }) => {
    // Test that title and description are rendered
    await expect(canvas.getByText('Bad request')).toBeVisible();
    await expect(
      canvas.getByText('Request blocked - no navigation options available.')
    ).toBeVisible();

    // Test that back button is NOT present
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};
