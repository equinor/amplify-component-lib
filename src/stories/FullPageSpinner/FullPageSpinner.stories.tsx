import { Story, Meta } from "@storybook/react";

import FullPageSpinner from "./FullPageSpinner";

export default {
  title: "FullPageSpinner",
  component: FullPageSpinner,
} as Meta;

const Template: Story = () => <FullPageSpinner />;

export const Primary = Template.bind({});
