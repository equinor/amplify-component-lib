import { Story, Meta } from "@storybook/react";

import ProgressBar, { ProgressBarProps } from "./ProgressBar";

export default {
  title: "ProgressBar",
  component: ProgressBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
