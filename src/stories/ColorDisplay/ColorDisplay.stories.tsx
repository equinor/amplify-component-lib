import { Story, Meta } from "@storybook/react";

import ColorDisplay from "./";

export default {
  title: "ColorDisplay",
  component: ColorDisplay,
} as Meta;

const Template: Story = () => <ColorDisplay />;

export const Primary = Template.bind({});
