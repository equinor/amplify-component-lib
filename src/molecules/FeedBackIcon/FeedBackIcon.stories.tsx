import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { FeedBackIcon, FeedBackIconProps } from './FeedBackIcon';

import { expect } from 'storybook/test';

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

export const TestRenderWithProps: Story = {
  tags: ['test-only'],
  args: {
    name: 'negative',
    variant: 'filled',
    size: 48,
  },
  play: async ({ canvas, args }) => {
    const svgComponent = canvas.getByTestId(`${args.name}-${args.variant}`);
    await expect(svgComponent).toBeInTheDocument();
    await expect(svgComponent).toHaveAttribute('height', args.size?.toString());
    await expect(svgComponent).toHaveAttribute('width', args.size?.toString());
  },
};
