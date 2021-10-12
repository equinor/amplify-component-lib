import { Story, Meta } from '@storybook/react';

import ApplicationTopBar from './TopBar';

export default {
  title: 'TopBar',
  component: ApplicationTopBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <ApplicationTopBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
