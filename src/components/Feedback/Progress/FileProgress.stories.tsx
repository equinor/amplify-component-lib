import { Story, Meta } from '@storybook/react';
import FileProgress, { FileProgressProps } from './FileProgress';

export default {
  title: 'Feedback/Progress/FileProgress',
  component: FileProgress,
} as Meta;

const Template: Story<FileProgressProps> = (args) => <FileProgress {...args} />;

export const Success = Template.bind({});
Success.args = {
  name: 'Fileimage.png',
};

export const Error = Template.bind({});
Error.args = {
  name: 'Fileimage.png',
  error: true,
  errorMsg: 'Failed to upload.',
};

export const Loading = Template.bind({});
Loading.args = {
  name: 'Fileimage.png',
  loading: true,
};
