import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

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

type Story = StoryObj<FileUploadAreaProps>;

export const Primary: Story = {};

export const MediumSize: Story = {
  args: {
    size: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};

export const DraggingOver: StoryFn<FileUploadAreaProps> = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FileUploadArea {...args} size="small" />
      <FileUploadArea {...args} size="medium" />
      <FileUploadArea {...args} />
    </div>
  );
};
