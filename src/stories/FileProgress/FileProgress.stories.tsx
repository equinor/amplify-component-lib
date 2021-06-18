import { Story, Meta } from "@storybook/react";
import FileProgress, { FileProgressProps } from ".";

export default {
  title: "FileUpload/FileProgress",
  component: FileProgress,
} as Meta;

const Template: Story<FileProgressProps> = (args) => <FileProgress {...args} />;

export const Success = Template.bind({});
Success.args = {
  fileId: "1111-2222-3333-4444",
  name: "Fileimage.png",
};

export const Error = Template.bind({});
Error.args = {
  fileId: "1111-2222-3333-4444",
  name: "Fileimage.png",
  error: true,
  errorMsg: "Failed to upload.",
};

export const Loading = Template.bind({});
Loading.args = {
  fileId: "1111-2222-3333-4444",
  name: "Fileimage.png",
  loading: true,
};
