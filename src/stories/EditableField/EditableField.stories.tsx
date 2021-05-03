import { Story, Meta } from "@storybook/react";

import EditableField, { EditableFieldProps } from "./EditableField";

export default {
  title: "EditableField",
  component: EditableField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<EditableFieldProps> = (args) => (
  <EditableField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
