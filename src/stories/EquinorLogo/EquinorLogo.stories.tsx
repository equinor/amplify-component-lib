import { Story, Meta } from "@storybook/react";

import EquinorLog, { EquinorLogoProps } from ".";

export default {
  title: "EquinorLog",
  component: EquinorLog,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<EquinorLogoProps> = (args) => <EquinorLog {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
