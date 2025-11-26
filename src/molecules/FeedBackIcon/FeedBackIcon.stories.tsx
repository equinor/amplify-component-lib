import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { FeedBackIcon, FeedBackIconProps } from './FeedBackIcon';

import { expect, within } from 'storybook/test';

const meta: Meta<typeof FeedBackIcon> = {
  title: 'Molecules/FeedBackIcon',
  component: FeedBackIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: ['positive', 'negative'],
    },
    variant: { control: 'radio', options: ['filled', 'outlined'] },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
  },
  args: {
    name: 'positive',
    variant: 'filled',
    size: 96,
  },
};

export default meta;

type Story = StoryObj<typeof FeedBackIcon>;

export const Primary: StoryFn<FeedBackIconProps> = (args) => (
  <FeedBackIcon {...args} />
);

export const PositiveFilledSize16: Story = {
  tags: ['test-only'],
  args: {
    name: 'positive',
    variant: 'filled',
    size: 16,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('height', args.size!.toString());
    await expect(svg).toHaveAttribute('width', args.size!.toString());
  },
};

export const NegativeOutlinedSize24: Story = {
  tags: ['test-only'],
  args: {
    name: 'negative',
    variant: 'outlined',
    size: 24,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('height', args.size!.toString());
    await expect(svg).toHaveAttribute('width', args.size!.toString());
  },
};

export const PositiveOutlinedSize32: Story = {
  tags: ['test-only'],
  args: {
    name: 'positive',
    variant: 'outlined',
    size: 32,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('height', args.size!.toString());
    await expect(svg).toHaveAttribute('width', args.size!.toString());
  },
};

export const NegativeFilledSize40: Story = {
  tags: ['test-only'],
  args: {
    name: 'negative',
    variant: 'filled',
    size: 40,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('height', args.size!.toString());
    await expect(svg).toHaveAttribute('width', args.size!.toString());
  },
};

export const PositiveFilledSize48: Story = {
  tags: ['test-only'],
  args: {
    name: 'positive',
    variant: 'filled',
    size: 48,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('height', args.size!.toString());
    await expect(svg).toHaveAttribute('width', args.size!.toString());
  },
};
