import { Meta, Story } from '@storybook/react';

import ApplicationIcon, { ApplicationIconProps } from './ApplicationIcon';

export default {
  title: 'Icons/ApplicationIcon',
  component: ApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: [
        '4dinsight',
        'acquire',
        'dasha',
        'depth-conversion',
        'recap',
        'portal',
        'pwex',
        'logging-qualification',
      ],
    },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
  },
  args: {
    name: '4dinsight',
    size: 96,
  },
} as Meta;

export const Primary: Story<ApplicationIconProps> = (args) => (
  <ApplicationIcon {...args} />
);
