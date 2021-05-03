import { Story, Meta } from "@storybook/react";

import MulticolorProgressCircle, {
  MulticolorProgressCircleProps,
} from "./MulticolorProgressCircle";

export default {
  title: "MulticolorProgressCircle",
  component: MulticolorProgressCircle,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<MulticolorProgressCircleProps> = (args) => (
  <MulticolorProgressCircle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
