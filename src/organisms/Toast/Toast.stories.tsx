import { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './Toast';
import { DEFAULT_TOAST_DURATION } from './Toast.constants';
import { spacings } from 'src/atoms/style';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Toast> = {
  title: 'Organisms/Toast',
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
    duration: DEFAULT_TOAST_DURATION * 10,
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
      options: ['success', 'warning', 'error'],
    },
    description: {
      control: 'text',
      description: 'Optional description text for the toast',
      type: 'string',
    },
    duration: {
      control: 'number',
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
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
    >
      <Toast {...args} variant="success" />
      <Toast {...args} variant="warning" />
      <Toast {...args} variant="error" />
    </div>
  ),
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
