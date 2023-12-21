import { Meta, StoryFn } from '@storybook/react';

import ApplicationDrawer from './ApplicationDrawer';

export default {
  title: 'Navigation/TopBar/ApplicationDrawer',
  component: ApplicationDrawer,
  // argTypes: { hasUnread: { control: 'boolean' } },
  // args: { hasUnread: true },
} as Meta;

export const Primary: StoryFn = (args) => {
  return <ApplicationDrawer></ApplicationDrawer>;
};
