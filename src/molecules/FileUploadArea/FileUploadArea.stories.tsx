import { Meta, StoryFn } from '@storybook/react';

import {
  FileUploadArea,
  FileUploadAreaProps,
} from 'src/molecules/FileUploadArea/FileUploadArea';

const meta: Meta<typeof FileUploadArea> = {
  title: 'Molecules/FileUploadArea',
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
};

export default meta;

export const Primary: StoryFn<FileUploadAreaProps> = (args) => (
  <FileUploadArea {...args} />
);
