import { Button } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ToastProvider, useToasts } from './ToastProvider';
import { spacings } from 'src/atoms';

import { expect, userEvent } from 'storybook/test';

function StoryComponent() {
  const { showToast } = useToasts();
  return (
    <div
      style={{ display: 'flex', gap: spacings.medium, position: 'relative' }}
    >
      <Button onClick={() => showToast('This is the title')}>
        Show toast with title
      </Button>
      <Button
        onClick={() =>
          showToast({
            title: 'This will show for 10 seconds',
            duration: 10,
          })
        }
      >
        Show toast long duration
      </Button>
      <Button
        onClick={() =>
          showToast({
            title: 'This is the title',
            description:
              'This is the description of the toast, it can be very very very very very very very long',
          })
        }
      >
        Show toast with title and description
      </Button>
    </div>
  );
}

const meta: Meta = {
  title: 'Providers/ToastProvider',
  component: StoryComponent,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
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
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  args: {},
};

export const BasicToastButton: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', {
      name: /Show toast with title$/i,
    });
    await userEvent.click(button);
    await expect(canvas.getByText('This is the title')).toBeInTheDocument();
  },
};

export const AdvancedToastButton: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', {
      name: /Show toast with title and description/i,
    });
    await userEvent.click(button);
    await expect(canvas.getByText('This is the title')).toBeInTheDocument();
    await expect(
      canvas.getByText(/This is the description of the toast/i)
    ).toBeInTheDocument();
  },
};
