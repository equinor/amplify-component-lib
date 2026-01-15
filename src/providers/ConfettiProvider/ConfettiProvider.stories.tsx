import { Button } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ConfettiProvider, useConfetti } from './ConfettiProvider';
import { spacings } from 'src/atoms';
import { ConfettiProps } from 'src/molecules/Confetti/Confetti.types';

import { expect, screen, userEvent } from 'storybook/test';

function StoryComponent(args: ConfettiProps) {
  const { boom, shower } = useConfetti();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacings.large,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button onClick={() => boom({ ...args, mode: 'boom' })}>Boom 🎉</Button>
        <Button onClick={() => shower({ ...args, mode: 'shower' })}>
          Shower 🌧️
        </Button>
      </div>

      <pre>
        <code style={{ width: '38rem' }}>
          {`// How to use the ConfettiProvider and useConfetti hook
        const { boom, shower } = useConfetti();

        boom();

        boom({
          colors: ['#ff0055', '#00ffcc'],
          shapeSize: 14,
        });

        shower({
          duration: 3000,
          colors: ['#ffffff'],
        });`}
        </code>
      </pre>
    </div>
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: 'Providers/ConfettiProvider',
  component: StoryComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ConfettiProvider>
        <Story />
      </ConfettiProvider>
    ),
  ],
  argTypes: {
    shapeSize: {
      control: {
        type: 'range',
        min: 4,
        max: 30,
        step: 1,
      },
      description: 'Size of each confetti particle',
    },
    colors: {
      control: 'object',
      description: 'Array of colors for confetti particles',
    },
    shapes: {
      control: 'object',
      description: 'Array of shapes used for particles',
    },
  },
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {};

export const Boom: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /boom/i });
    await userEvent.click(button);

    await expect(screen.getByTestId('canvas-confetti')).toBeInTheDocument();
    setTimeout(async () => {
      await expect(
        screen.getByTestId('canvas-confetti')
      ).not.toBeInTheDocument();
    }, 4000);
  },
};

export const Shower: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /shower/i });
    await userEvent.click(button);

    await expect(screen.getByTestId('canvas-confetti')).toBeInTheDocument();
    setTimeout(async () => {
      await expect(
        screen.getByTestId('canvas-confetti')
      ).not.toBeInTheDocument();
    }, 3000);
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /boom/i });
    await userEvent.click(button);

    await expect(screen.getByTestId('canvas-confetti')).toBeInTheDocument();
    setTimeout(async () => {
      await expect(
        screen.getByTestId('canvas-confetti')
      ).not.toBeInTheDocument();
    }, 3000);
  },
};
