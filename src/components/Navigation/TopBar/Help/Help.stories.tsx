import { Meta, StoryFn } from '@storybook/react';

import { Help } from './Help';

export default {
  title: 'Navigation/TopBar/Help',
  component: Help,
  argTypes: {
    applicationName: { control: 'text' },
  },
  args: {
    applicationName: 'test.com/',
  },
} as Meta;
export const Primary: StoryFn = (args) => {
  return <Help applicationName={args.applicationName} />;
};
