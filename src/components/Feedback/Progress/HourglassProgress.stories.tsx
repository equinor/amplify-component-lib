import { Meta, StoryFn } from '@storybook/react';

import HourglassProgress from './HourglassProgress';

export default {
  title: 'Feedback/Progress/Hourglass',
  component: HourglassProgress,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'neutral'],
    },
    size: {
      control: 'radio',
      options: [16, 24, 32, 40, 48],
    },

    speed: { control: 'radio', options: ['slow', 'normal', 'fast'] },
  },

  args: { color: 'primary', size: 32, speed: 'normal' },
} as Meta;

export const Primary: StoryFn = (args) => {
  return <HourglassProgress {...args} />;
};
