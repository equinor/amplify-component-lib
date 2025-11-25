import { folder } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import {
  FileUploadArea,
  FileUploadAreaProps,
} from 'src/molecules/FileUploadArea/FileUploadArea';

import { expect, within } from 'storybook/test';

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

// Test-only stories
export const TestTextAndIconRender: Story = {
  tags: ['test-only'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getByTestId('eds-icon-path');
    const text = canvas.getByText(/browse files/i);

    await expect(icons).toHaveAttribute('d', folder.svgPathData);
    await expect(text).toBeVisible();
  },
};

export const TestSmallSize: Story = {
  tags: ['test-only'],
  args: {
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.queryByText('browse');

    await expect(canvas.getByTestId('upload-illustration')).toBeInTheDocument();
    await expect(text).toBeNull();
  },
};

export const TestMediumSize: Story = {
  tags: ['test-only'],
  args: {
    size: 'medium',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.queryByText('browse');

    await expect(canvas.getByTestId('upload-illustration')).toBeInTheDocument();
    await expect(text).toBeNull();
  },
};
