import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { SeasonalColorsMap } from './utils/seasonalColors';
import { Confetti } from './Confetti';
import {
  CONFETTI_DEFAULT_COLORS,
  CONFETTI_DEFAULT_SHAPES,
} from './Confetti.constants';
import { ConfettiProps } from './Confetti.types';
import { spacings } from 'src/atoms';
import {
  ConfettiProvider,
  useConfetti,
} from 'src/providers/ConfettiProvider/ConfettiProvider';

import { expect } from 'storybook/test';
import styled from 'styled-components';

const meta: Meta<typeof Confetti> = {
  title: 'Molecules/Confetti',
  component: Confetti,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ConfettiProvider>
        <Story />
      </ConfettiProvider>
    ),
  ],
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['shower', 'boom'],
    },
    shapes: {
      control: { type: 'check' },
      options: CONFETTI_DEFAULT_SHAPES,
    },
    colors: {
      control: { type: 'check' },
      options: CONFETTI_DEFAULT_COLORS,
    },
    effectCount: {
      if: { arg: 'mode', eq: 'boom' },
    },
    duration: {
      if: { arg: 'mode', eq: 'shower' },
      control: { type: 'number' },
    },
  },
  args: {
    shapeSize: 12,
    mode: 'boom',
    shapes: CONFETTI_DEFAULT_SHAPES,
    colors: CONFETTI_DEFAULT_COLORS,
    effectCount: Infinity,
  },
};

export default meta;

const Container = styled.div`
  width: 980px;
  height: 480px;
  position: relative;
  overflow: hidden;
`;

export const Boom: StoryFn = (props: ConfettiProps) => {
  return (
    <Container>
      <Confetti {...props} mode="boom" />
    </Container>
  );
};

export const Shower: StoryFn = (props: ConfettiProps) => {
  return (
    <Container>
      <Confetti {...props} mode="shower" />
    </Container>
  );
};

const ButtonTriggeredContainer = styled.div`
  width: 100%;
  padding: ${spacings.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.medium};
`;

export const TriggerConfetti: StoryFn = () => {
  const { boom, shower } = useConfetti();

  return (
    <ButtonTriggeredContainer>
      <Typography>
        Click the buttons below to trigger the boom and shower confetti effects
      </Typography>
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button onClick={() => boom()}>Boom 🎉</Button>
        <Button onClick={() => shower()}>Shower 🌧️</Button>
      </div>
    </ButtonTriggeredContainer>
  );
};

export const SeasonalColorsExample: StoryFn = () => {
  const christmasColors = SeasonalColorsMap['christmas'].colors;

  return (
    <Container>
      <Confetti mode="shower" colors={christmasColors} />
    </Container>
  );
};

type Story = StoryObj<typeof Confetti>;

export const TestRendersCanvas: Story = {
  tags: ['test-only'],
  args: {
    mode: 'shower',
    duration: 1000,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('canvas-confetti')).toBeInTheDocument();
  },
};

export const TestCustomStyle: Story = {
  tags: ['test-only'],
  args: {
    style: { border: '2px solid red' },
  },
  play: async ({ canvas }) => {
    const canvasElement = canvas.getByTestId('canvas-confetti');
    await expect(canvasElement).toHaveStyle('border: 2px solid red');
  },
};

export const TestCustomClassName: Story = {
  tags: ['test-only'],
  args: {
    className: 'my-custom-confetti',
  },
  play: async ({ canvas }) => {
    const canvasElement = canvas.getByTestId('canvas-confetti');
    await expect(canvasElement).toHaveClass('my-custom-confetti');
  },
};
