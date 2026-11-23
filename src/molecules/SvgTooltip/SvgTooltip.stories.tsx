import { Meta, StoryObj } from '@storybook/react-vite';

import { SvgTooltip } from './SvgTooltip';

import { expect, within } from 'storybook/test';

const meta = {
  title: 'Molecules/SvgTooltip',
  component: SvgTooltip,
  args: {
    x: 50,
    y: 50,
    title: 'Optional tooltip title',
  },
  argTypes: {
    title: { control: 'text' },
    x: { control: 'number' },
    y: { control: 'number' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip drawn with native SVG elements for use inside an svg, e.g. charts. x and y is the top left corner of the tooltip, positioning is up to the consumer.',
      },
    },
  },
  decorators: [
    (Story) => (
      <svg width={300} height={150} style={{ border: '1px dashed gray' }}>
        <Story />
      </svg>
    ),
  ],
} satisfies Meta<typeof SvgTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['!dev', '!autodocs'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tooltip')).toBeVisible();
    await expect(canvas.getByText(args.title!)).toBeInTheDocument();
  },
};

export const Primary: Story = {};

export const NoTitle: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: '' },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).queryByRole('tooltip')
    ).not.toBeInTheDocument();
  },
};
