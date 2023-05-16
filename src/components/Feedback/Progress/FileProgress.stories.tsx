import { Meta, StoryFn } from '@storybook/react';

import FileProgress, { FileProgressProps } from './FileProgress';

export default {
  title: 'Feedback/Progress/FileProgress',
  component: FileProgress,
} as Meta;

const Template: StoryFn<FileProgressProps> = (args) => (
  <FileProgress {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'Fileimage.png',
  loading: true,
  error: false,
  errorMsg: 'Failed to upload.',
};
