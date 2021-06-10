import { Story, Meta } from "@storybook/react";
import FileUploadArea, { FileUploadAreaProps } from ".";

export default {
  title: "FileUpload/FileUploadArea",
  component: FileUploadArea,
} as Meta;

const Template: Story<FileUploadAreaProps> = (args) => (
  <FileUploadArea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  accept: ".csv,.jpg,.jpeg,.pdf,.ppt,.docx,.xls,.xlsx",
};
