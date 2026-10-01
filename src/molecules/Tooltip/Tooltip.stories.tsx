import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';

import { expect, screen, userEvent, waitFor } from 'storybook/test';

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  args: {
    title: 'Optional tooltip title',
    children: <p>Hover me</p>,
  },
  argTypes: {
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    enterDelay: { control: 'number' },
    exitDelay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Optional tooltip with centered text. Empty titles and disabled tooltips are hidden.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Optional tooltip title',
    children: <Icon data={folder} />,
  },
};

export const Multiline: Story = {
  args: {
    title:
      'This is a tooltip that goes over multiple lines. The text will fill the max width of the container.',
  },
  play: async ({ canvas, args }) => {
    await userEvent.hover(canvas.getByText('Hover me'));
    const tooltip = await canvas.findByRole('tooltip');
    const text = canvas.getByText(args.title as string);

    await waitFor(() => {
      expect(tooltip).toBeVisible();
      expect(getComputedStyle(text).textAlign).toBe('center');
      const range = document.createRange();
      range.selectNodeContents(text);
      const lines = Array.from(range.getClientRects());
      expect(lines.length).toBeGreaterThan(1);
      const bounds = tooltip.getBoundingClientRect();
      for (const line of lines) {
        expect(
          Math.abs(
            line.left + line.width / 2 - (bounds.left + bounds.width / 2)
          )
        ).toBeLessThan(1);
      }
    });
  },
};

export const CustomTextAlignment: Story = {
  args: {
    title: (
      <div style={{ textAlign: 'left' }}>
        Custom content can keep its own alignment.
        <br />
        This line stays left-aligned.
      </div>
    ),
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByText('Hover me'));
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(
      getComputedStyle(canvas.getByText(/Custom content can keep/)).textAlign
    ).toBe('left');
  },
};

export const WithCustomDelay: Story = {
  args: {
    title: 'Delayed tooltip',
    enterDelay: 500,
    exitDelay: 1000,
  },
};

export const Disabled: Story = {
  args: {
    title: 'This should not show',
    disabled: true,
  },
};

export const TestWithTitle: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: faker.animal.dog(),
    children: <p>Hover me</p>,
  },
  play: async ({ canvas, args }) => {
    const content = canvas.getByText('Hover me');
    await expect(content).toBeInTheDocument();

    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tooltip = screen.getByText(args.title as string);
    await expect(tooltip).toBeInTheDocument();
  },
};

export const TestDisabled: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Should not appear',
    disabled: true,
    children: <p>Disabled tooltip</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Disabled tooltip');
    await expect(content).toBeInTheDocument();

    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));

    await expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  },
};

export const TestHideWhileShowing: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Hide me quickly',
    enterDelay: 500,
    children: <p>Quick hover</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Quick hover');

    // Hover then immediately unhover to trigger hide clearing showTimer
    await userEvent.hover(content);
    await userEvent.unhover(content);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  },
};

export const TestShowWhileAlreadyOpen: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Already open',
    enterDelay: 0,
    children: <p>Double hover</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Double hover');

    // First hover to open
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Unhover briefly then re-hover while tooltip is still open (hits early return in show)
    await userEvent.unhover(content);
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));

    await expect(screen.getByRole('tooltip')).toBeInTheDocument();
  },
};

export const TestPlacementTop: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Top tooltip',
    placement: 'top',
    enterDelay: 0,
    children: <p>Top placement</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'fixed', bottom: '20px', left: '50%' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    const content = canvas.getByText('Top placement');
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByRole('tooltip')).toBeInTheDocument();
  },
};

export const TestPlacementBottom: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Bottom tooltip',
    placement: 'bottom',
    enterDelay: 0,
    children: <p>Bottom placement</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'fixed', top: '20px', left: '50%' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    const content = canvas.getByText('Bottom placement');
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByRole('tooltip')).toBeInTheDocument();
  },
};

export const TestPlacementLeft: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Left tooltip',
    placement: 'left',
    enterDelay: 0,
    children: <p>Left placement</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'fixed', right: '20px', top: '50%' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    const content = canvas.getByText('Left placement');
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByRole('tooltip')).toBeInTheDocument();
  },
};

export const TestPlacementRight: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: 'Right tooltip',
    placement: 'right',
    enterDelay: 0,
    children: <p>Right placement</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'fixed', left: '20px', top: '50%' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    const content = canvas.getByText('Right placement');
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByRole('tooltip')).toBeInTheDocument();
  },
};

export const TestWithReactNodeTitle: Story = {
  tags: ['test-only', '!dev', '!autodocs'],
  args: {
    title: <strong>Rich title</strong>,
    children: <p>Node title</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Node title');
    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(screen.getByText('Rich title')).toBeInTheDocument();
  },
};

export const WithoutTitle: Story = {
  tags: ['test-only'],
  args: {
    title: undefined,
    children: <p>Hover me</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Hover me');
    await expect(content).toBeInTheDocument();

    await userEvent.hover(content);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
  },
};
