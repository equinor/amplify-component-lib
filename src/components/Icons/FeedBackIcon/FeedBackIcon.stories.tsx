import { Meta, StoryFn } from '@storybook/react';

import FeedBackIcon, { FeedBackIconProps } from './FeedBackIcon';

export default {
  title: 'Icons/FeedBackIcon',
  component: FeedBackIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: ['positive', 'negative'],
    },
    variant: { control: 'radio', options: ['filled', 'outlined'] },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
  },
  args: {
    name: 'positive',
    variant: 'filled',
    size: 96,
  },
} as Meta;

export const Primary: StoryFn<FeedBackIconProps> = (args) => (
  <FeedBackIcon {...args} />
);
