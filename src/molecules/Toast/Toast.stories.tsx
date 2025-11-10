import { hill_shading, users_circle } from '@equinor/eds-icons';
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
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=20462-42970&m=dev',
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
    icon: {
      description: 'Icon in header, has defaults when using variants',
      control: 'select',
      options: [undefined, 'users_circle', 'hill_shading'],
      mapping: {
        undefined: undefined,
        users_circle,
        hill_shading,
      },
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

export const Default: Story = {
  args: {
    icon: users_circle,
  },
};

export const Variants: Story = {
  args: {
    title: 'A really long title',
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
    icon: users_circle,
    duration: 120,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  },
};

export const WithDescription: Story = {
  args: {
    icon: users_circle,
    description: 'This is the description, it can be a longer text',
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
    await expect(canvas.getByText(args.description!)).toBeInTheDocument();
  },
};

export const WithAction: Story = {
  args: {
    icon: users_circle,
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
  tags: ['test-only'],
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const CallsOnCloseAfterDuration: Story = {
  tags: ['test-only'],
  args: {
    duration: 1,
  },
  play: async ({ args }) => {
    await new Promise((resolve) => setTimeout(resolve, args.duration! * 1000));
    await expect(args.onClose).toHaveBeenCalled();
  },
};
