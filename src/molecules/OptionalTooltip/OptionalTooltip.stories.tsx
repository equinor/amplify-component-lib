import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

import { expect, screen, userEvent } from 'storybook/test';

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

export const TestWithTitle: Story = {
  tags: ['test-only'],
  args: {
    title: faker.animal.dog(),
    children: <p>Hover me</p>,
  },
  play: async ({ canvas, args }) => {
    const content = canvas.getByText('Hover me');
    await expect(content).toBeInTheDocument();

    await userEvent.hover(content);
    // tooltip has open delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tooltip = screen.getByText(args.title as string);
    await expect(tooltip).toBeInTheDocument();
  },
};

export const TestWithoutTitle: Story = {
  tags: ['test-only'],
  args: {
    title: undefined,
    children: <p>Hover me no tooltip</p>,
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Hover me no tooltip');
    await expect(content).toBeInTheDocument();

    await userEvent.hover(content);
    // tooltip has open delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
  },
};
