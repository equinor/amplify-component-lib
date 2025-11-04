import { Meta, StoryObj } from '@storybook/react-vite';

import { PageNotFound } from './PageNotFound';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof PageNotFound> = {
  title: 'Organisms/Status/Collections/PageNotFound',
  component: PageNotFound,
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
type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Test that default description is rendered
    await expect(
      canvas.getByText(
        /It looks like the page you're looking for has gone missing/
      )
    ).toBeVisible();

    // Test that back button is present by default
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const CustomDescription: Story = {
  args: {
    description: 'This is a custom 404 message for testing purposes.',
  },
  play: async ({ canvas, args }) => {
    // Test custom description is rendered
    await expect(canvas.getByText(args.description!)).toBeVisible();

    // Test that back button is still present
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithFallbackUrl: Story = {
  args: {
    redirectFallbackUrl: '/dashboard',
    description: 'Page not found - will redirect to dashboard if no history.',
  },
  play: async ({ canvas }) => {
    // Test that component renders with fallback URL prop
    await expect(
      canvas.getByText(/will redirect to dashboard if no history/)
    ).toBeVisible();

    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
  },
};

export const WithCustomCallback: Story = {
  args: {
    onBackClick: fn(),
    description: 'Page not found - uses custom navigation callback.',
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
    description: 'Page not found - no back button available.',
  },
  play: async ({ canvas, args }) => {
    // Test that description is rendered
    await expect(canvas.getByText(args.description!)).toBeVisible();

    // Test that back button is NOT present
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  },
};

export const AllPropsTest: Story = {
  args: {
    description: 'Comprehensive test with all props configured.',
    redirectFallbackUrl: '/home',
    onBackClick: fn(),
    hideBackButton: false,
  },
  play: async ({ canvas, args }) => {
    // Test custom description
    await expect(canvas.getByText(args.description!)).toBeVisible();

    // Test back button functionality
    const backButton = canvas.getByRole('button');
    await expect(backButton).toBeVisible();
    await userEvent.click(backButton);
    await expect(args.onBackClick).toHaveBeenCalledTimes(1);
  },
};
