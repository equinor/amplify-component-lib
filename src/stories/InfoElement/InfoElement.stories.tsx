import { Story, Meta } from "@storybook/react";

import InfoElement, { InfoElementProps } from "./InfoElement";

export default {
  title: "InfoElement",
  component: InfoElement,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<InfoElementProps> = (args) => <InfoElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
