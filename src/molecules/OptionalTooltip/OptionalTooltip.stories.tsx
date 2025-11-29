import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

import { expect, within } from 'storybook/test';

const meta: Meta<typeof OptionalTooltip> = {
  title: 'Molecules/OptionalTooltip',
  component: OptionalTooltip,
  argTypes: { title: { control: 'text' } },
  args: { title: 'Optional tooltip title' },
  parameters: {
    docs: {
      description: {
        component:
          'This component enables us to show a tooltip optionally, so if the title is either null or empty it hides the tooltip',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof OptionalTooltip>;

export const Primary: StoryFn = (args) => (
  <OptionalTooltip {...args}>
    <Icon data={folder} />
  </OptionalTooltip>
);

export const RendersWithTitle: Story = {
  tags: ['test-only'],
  args: {
    title: 'Tooltip Title',
    children: <p>Content Text</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Content Text');
    await expect(content).toBeInTheDocument();
  },
};

export const RendersWithoutTitle: Story = {
  tags: ['test-only'],
  args: {
    title: undefined,
    children: <p>Content Without Tooltip</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByText('Content Without Tooltip');
    await expect(content).toBeInTheDocument();
  },
};
