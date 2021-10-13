import { Story, Meta } from '@storybook/react';

import SideBar from '../../components/SideBar';

export default {
  title: 'SideBar',
  component: SideBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = () => (
  <div style={{ display: 'flex', height: '95vh' }}>
    <SideBar />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
