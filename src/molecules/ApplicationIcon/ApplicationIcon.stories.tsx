import { Meta, StoryFn } from '@storybook/react';

import {
  ApplicationIcon,
  ApplicationIconProps,
} from 'src/molecules/ApplicationIcon/ApplicationIcon';

export default {
  title: 'Icons/ApplicationIcon',
  component: ApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: [
        'fallback',
        '4dinsight',
        'acquire',
        'dasha',
        'orca',
        'recap',
        'portal',
        'pwex',
        'logging-qualification',
        'inpress',
        'bravos',
        'premo',
      ],
    },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
    grayScale: { control: 'boolean' },
  },
  args: {
    name: '4dinsight',
    size: 96,
  },
} as Meta;

export const Primary: StoryFn<ApplicationIconProps> = (args) => (
  <ApplicationIcon {...args} />
);
