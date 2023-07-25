import { Meta, StoryFn } from '@storybook/react';

import FileUploadArea, { FileUploadAreaProps } from './FileUploadArea';

export default {
  title: 'Inputs/FileUploadArea',
  component: FileUploadArea,
  argTypes: {
    accept: {
      description:
        'Takes an object with MIME types, look at "react-dropzone" documentation',
    },
  },
  args: {
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'text/csv': ['.csv'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
    },
  },
} as Meta;

export const Primary: StoryFn<FileUploadAreaProps> = (args) => (
  <FileUploadArea {...args} />
);
