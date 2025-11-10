import { Button } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ToastProvider, useToasts } from './ToastProvider';
import { spacings } from 'src/atoms';
import { Toast, ToastProps } from 'src/molecules/Toast/Toast';

import { expect, fn, userEvent } from 'storybook/test';

function StoryComponent(args: ToastProps | string) {
  const { showToast } = useToasts();
  return (
    <div
      style={{ display: 'flex', gap: spacings.medium, position: 'relative' }}
    >
      <Button onClick={() => showToast(args)}>Show toast</Button>
    </div>
  );
}

const meta: Meta<typeof Toast> = {
  title: 'Providers/ToastProvider',
  component: StoryComponent,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    title: 'トースト',
    variant: 'info',
  },
  argTypes: {
    variant: {
      description: 'Variant of the toast, default is neutral',
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
  tags: ['!autodocs'],
  decorators: (Story) => (
    <ToastProvider>
      <Story />
    </ToastProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const BasicToastButton: Story = {
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', {
      name: /Show toast$/i,
    });
    await userEvent.click(button);
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
  },
};

export const AdvancedToastButton: Story = {
  args: {
    title: 'This is the title',
    description: 'This is the description of the toast',
    variant: 'error',
    action: {
      text: 'Undo',
      onClick: fn(),
    },
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', {
      name: /Show toast/i,
    });
    await userEvent.click(button);
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
    await expect(canvas.getByText(args.description!)).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: args.action!.text })
    ).toBeInTheDocument();
  },
};
