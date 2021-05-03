import { Story, Meta } from "@storybook/react";

import SideBar from "./SideBar";

export default {
  title: "SideBar",
  component: SideBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
