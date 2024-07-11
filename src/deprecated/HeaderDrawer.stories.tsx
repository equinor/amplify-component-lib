import { Typography } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import HeaderDrawer, { HeaderDrawerProps } from 'src/deprecated/HeaderDrawer';

export default {
  title: 'Deprecated/HeaderDrawer',
  component: HeaderDrawer,
  argTypes: {
    title: { control: 'text' },
    openByDefault: { control: 'boolean' },
  },
  args: {
    title: 'Title text goes here',
    openByDefault: false,
  },
};

export const Primary: StoryFn<HeaderDrawerProps> = (args) => {
  return (
    <HeaderDrawer {...args}>
      <Typography>Children text</Typography>
    </HeaderDrawer>
  );
};
