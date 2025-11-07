import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { Toast } from 'src/molecules/Toast/Toast';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    title: 'This is the title',
    onClose: fn(),
  },
  argTypes: {
    title: {
      description: 'Title text',
    },
    onClose: {
      description: 'Function called when the toast is closed',
    },
    variant: {
      description: 'Variant of the toast',
      control: 'select',
      options: ['neutral', 'info', 'warning', 'error', 'success'],
    },
    description: {
      control: 'text',
      description: 'Optional description text for the toast',
      type: 'string',
    },
    duration: {
      control: {
        type: 'range',
        min: 1,
        max: 60,
        step: 1,
      },
      description: 'Duration in seconds for the progress bar',
      type: 'number',
    },
    action: {
      control: 'select',
      description: 'Optional action button for the toast',
      options: [undefined, 'withAction'],
      mapping: {
        undefined: undefined,
        withAction: {
          onClick: fn(),
          text: 'Undo',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const Variants: Story = {
  args: {
    title: 'A really long title title tilte tiltet wowowo wo wo wo wo ow',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
    >
      <Toast {...args} variant="neutral" />
      <Toast {...args} variant="info" />
      <Toast {...args} variant="warning" />
      <Toast {...args} variant="error" />
      <Toast {...args} variant="success" />
    </div>
  ),
};
export const WithDuration: Story = {
  args: {
    duration: 120,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  },
};

export const WithDescription: Story = {
  args: {
    description: 'This is the description, it can be a longer text',
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
    await expect(canvas.getByText(args.description!)).toBeInTheDocument();
  },
};

export const WithAction: Story = {
  args: {
    description: 'This is the description, it can be a longer text',
    action: {
      onClick: fn(),
      text: 'Undo',
    },
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: args.action!.text })
    );
    await expect(args.action!.onClick).toHaveBeenCalled();
  },
};

export const CallsOnCloseOnClick: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const CallsOnCloseAfterDuration: Story = {
  args: {
    duration: 1,
  },
  play: async ({ args }) => {
    await new Promise((resolve) => setTimeout(resolve, args.duration! * 1000));
    await expect(args.onClose).toHaveBeenCalled();
  },
};
