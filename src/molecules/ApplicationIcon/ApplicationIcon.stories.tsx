import { Meta, StoryFn } from '@storybook/react-vite';

import { ApplicationIcon, ApplicationIconProps } from './ApplicationIcon';

const meta: Meta<typeof ApplicationIcon> = {
  title: 'Molecules/ApplicationIcon',
  component: ApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: [
        'fallback',
        '4dinsight',
        'adca',
        'acquire',
        'dasha',
        'forecast-formatter',
        'orca',
        'recap',
        'jsembark',
        'flux-maps',
        'pwex',
        'logging-qualification',
        'inpress',
        'bravos',
        'premo',
        'sam',
        'subsurface portal',
        'jscalendar',
      ],
    },
    size: { control: 'radio', options: [16, 24, 32, 40, 48, 96] },
    grayScale: { control: 'boolean' },
  },
  args: {
    name: '4dinsight',
    size: 96,
  },
};

export default meta;

export const Example: StoryFn<ApplicationIconProps> = (args) => (
  <ApplicationIcon {...args} />
);
