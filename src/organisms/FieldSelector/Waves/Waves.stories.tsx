import { StoryFn } from '@storybook/react';

import { Waves, WavesProps } from './Waves';

export default {
  title: 'Organisms/FieldSelector/Waves',
  component: Waves,
  argTypes: {
    waveIntervalDist: {
      control: { type: 'range', min: 1, max: 10, step: 0.25 },
      name: 'Wave Interval Distance (rem)',
    },
    waveDelay: {
      control: { type: 'range', min: 0, max: 5, step: 0.2 },
      name: 'Wave Animation Delay (s)',
    },
    numWaves: {
      control: { type: 'range', min: 1, max: 30, step: 1 },
      name: 'Number of Waves',
    },
    heightFromBottom: {
      control: { type: 'range', min: 0, max: 1200, step: 10 },
      name: 'Wave container position (px)',
    },
  },
  args: {
    waveIntervalDist: 3,
    waveDelay: 0.75,
    numWaves: 10,
    heightFromBottom: 600,
  },
};

export const Primary: StoryFn<WavesProps> = (args) => {
  return <Waves {...args} />;
};
