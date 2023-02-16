import { Meta, Story } from '@storybook/react';

import Feedback from './Feedback';

export default {
  title: 'Navigation/TopBar/Feedback',
  component: Feedback,
} as Meta;

export const Primary: Story = () => {
  return <Feedback></Feedback>;
};
