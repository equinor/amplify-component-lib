import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from 'src/molecules/OptionalTooltip/Tooltip.tsx';

import { expect, screen, userEvent } from 'storybook/test';

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
      options: ['top', 'bottom', 'left', 'right'],
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
          'This component enables us to show a tooltip optionally, so if the title is either null or empty or it has disabled state it hides the tooltip',
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
  tags: ['test-only'],
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
  },
};
