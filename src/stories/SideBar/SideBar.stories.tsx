import { Story, Meta } from '@storybook/react';

import SideBar from './SideBar';

export default {
  title: 'SideBar',
  component: SideBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = () => (
  <div style={{ display: 'flex' }}>
    <SideBar />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
