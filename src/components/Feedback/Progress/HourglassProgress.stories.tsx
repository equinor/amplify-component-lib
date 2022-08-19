import { ComponentMeta, Story } from '@storybook/react';
import HourglassProgress, { HourglassProgressProps } from './HourglassProgress';

import React from 'react';

export default {
  title: 'Feedback/Progress/Hourglass',
  component: HourglassProgress,
  args: { color: 'primary', size: 32, speed: 'normal' },
} as ComponentMeta<typeof HourglassProgress>;

export const Primary: Story<HourglassProgressProps> = (args) => {
  return <HourglassProgress {...args} />;
};
