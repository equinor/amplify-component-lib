import { Meta, Story } from '@storybook/react';

import FeedBackIcon, { FeedBackIconProps } from './FeedBackIcon';

export default {
  title: 'Icons/FeedBackIcon',
  component: FeedBackIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: ['positive', 'negative', undefined],
    },
    variant: { control: 'radio', options: ['filled', 'outlined', undefined] },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
  },
  args: {
    name: 'positive',
    variant: 'filled',
    size: 96,
  },
} as Meta;

export const Primary: Story<FeedBackIconProps> = (args) => (
  <FeedBackIcon {...args} />
);
