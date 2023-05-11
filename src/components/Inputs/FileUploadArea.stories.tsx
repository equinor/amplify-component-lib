import { Meta, StoryFn } from '@storybook/react';

import FileUploadArea, { FileUploadAreaProps } from './FileUploadArea';

export default {
  title: 'Inputs/FileUploadArea',
  component: FileUploadArea,
} as Meta;

const Template: StoryFn<FileUploadAreaProps> = (args) => (
  <FileUploadArea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  accept: {
    'application/pdf': ['.pdf'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'text/csv': ['.csv'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      ['.pptx'],
  },
};
