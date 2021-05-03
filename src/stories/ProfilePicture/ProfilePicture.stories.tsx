import { Story, Meta } from "@storybook/react";

import { createImageFromInitials } from "./";

export default {
  title: "ProfilePicture",
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story = (args) => (
  <img src={createImageFromInitials("Fredrik Wigsnes")} alt="ProfilePicture" />
);

export const Primary = Template.bind({});
