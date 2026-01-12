import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { boomConfetti } from './imperatives/boomConfetti';
import { showerConfetti } from './imperatives/showerConfetti';
import { SeasonalColorsMap } from './utils/seasonalColors';
import { Confetti } from './Confetti';
import {
  CONFETTI_DEFAULT_COLORS,
  CONFETTI_DEFAULT_SHAPES,
} from './Confetti.constants';
import { ConfettiProps } from './Confetti.types';
import { spacings } from 'src/atoms';

import styled from 'styled-components';

const meta: Meta<typeof Confetti> = {
  title: 'Molecules/Confetti',
  component: Confetti,
  parameters: {
    layout: 'fullscreen',
  },
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
    effectInterval: {
      if: { arg: 'mode', eq: 'boom' },
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
    effectInterval: 3000,
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

export const TriggerConfettiBoom: StoryFn = () => {
  const handleClick = () => {
    boomConfetti();
  };

  return (
    <ButtonTriggeredContainer>
      <Typography>
        Click the button below to trigger the boomConfetti function
      </Typography>
      <Button onClick={handleClick}>Trigger a single Confetti Boom</Button>
    </ButtonTriggeredContainer>
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

export const TriggerConfettiShower: StoryFn = () => {
  const handleClick = () => {
    showerConfetti();
  };

  return (
    <ButtonTriggeredContainer>
      <Typography>
        Click the button below to trigger the showerConfetti function
      </Typography>
      <Button onClick={handleClick}>Trigger a single Confetti Shower</Button>
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
