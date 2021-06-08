import { Story, Meta } from "@storybook/react";
import FileProgress, { FileProgressProps } from ".";

export default {
  title: "FileProgress",
  component: FileProgress,
} as Meta;

const Template: Story<FileProgressProps> = (args) => <FileProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "1111-2222-3333-4444",
  name: "Fileimage.png",
};
