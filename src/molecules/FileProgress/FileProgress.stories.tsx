import { useEffect, useState } from 'react';

import {
  clear,
  close_circle_outlined,
  delete_to_trash,
  error_outlined,
  library_pdf,
  refresh,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { FileProgress } from 'src/molecules/FileProgress/FileProgress';
import { FileProgressProps } from 'src/molecules/FileProgress/FileProgress.types';

import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const StoryComponent = (args: FileProgressProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (!(args.file instanceof File) && typeof args.file[0] === 'string') {
      // Has uploaded file to storybook
      const handleSetFile = async () => {
        const response = await fetch((args.file as unknown as string[])[0]);
        const blob = (await response.blob()) as File;
        setFile(blob);
      };
      handleSetFile();
    }
  }, [args.file]);

  if (args.file instanceof File || file === undefined) {
    return <FileProgress {...args} />;
  }

  return <FileProgress {...args} file={file} />;
};

const meta: Meta<typeof FileProgress> = {
  title: 'Molecules/FileProgress',
  component: StoryComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19751&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
  argTypes: {
    compact: { control: 'boolean' },
    file: {
      control: {
        type: 'file',
        accept: '.png, .jpg, .jpeg, .xlsx, .csv, .pdf, .txt, .pptx, .docx',
      },
    },
    progressPercent: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
      description:
        'The percentage of the file that has been uploaded, if undefined its considered indeterminate',
    },
    isDone: { control: 'boolean' },
    isError: { control: 'boolean' },
    customLoadingText: { control: 'text' },
    customCompleteText: { control: 'text' },
    fullErrorText: { control: 'text' },
  },
  args: {
    compact: false,
    file: new File(
      [
        new ArrayBuffer(
          faker.number.int({ min: Math.pow(10, 7), max: Math.pow(10, 9) })
        ),
      ],
      `${faker.commerce.productName().replaceAll(' ', '_')}.${faker.system.fileExt('image/png')}`,
      {
        type: 'image/png',
      }
    ),
    progressPercent: undefined,
    isDone: false,
    customLoadingText: undefined,
    customCompleteText: undefined,
    isError: false,
    fullErrorText: undefined,
    onCancel: () => null,
    onRetry: () => null,
    onDelete: () =>
      new Promise<void>((resolve) => setTimeout(() => resolve(), 2000)),
  },
};

export default meta;

type Story = StoryObj<FileProgressProps>;

export const Default: Story = {
  args: {
    indeterminate: true,
  },
};

export const ReallyLongFileName: Story = {
  args: {
    indeterminate: true,
    isDone: true,

    file: new File(
      [
        new ArrayBuffer(
          faker.number.int({ min: Math.pow(10, 7), max: Math.pow(10, 9) })
        ),
      ],
      `${(faker.string.uuid() + faker.string.uuid()).replaceAll('-', '')}.${faker.system.fileExt('image/png')}`,
      {
        type: 'image/png',
      }
    ),
  },
};

export const Compact: Story = {
  args: {
    indeterminate: true,
    compact: true,
  },
};

export const ProgressPercent: Story = {
  args: {
    progressPercent: 75,
  },
};

export const ProgressPercentCompact: Story = {
  args: {
    compact: true,
    progressPercent: 75,
  },
};

export const Error: Story = {
  args: {
    isError: true,
  },
};

export const ErrorCompact: Story = {
  args: {
    isError: true,
    compact: true,
  },
};

export const WithoutDelete: Story = {
  args: {
    onDelete: undefined,
  },
};

export const WithoutDeleteCompact: Story = {
  args: {
    compact: true,
    onDelete: undefined,
  },
};

// Test-only stories
export const TestRegularLoadingState: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    progressPercent: 50,
    isDone: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loadingText = canvas.getByText('loading...');
    const progressBar = canvas.getByRole('progressbar');
    const cancelIcons = canvas.getAllByTestId('eds-icon-path');

    await expect(loadingText).toBeInTheDocument();
    await expect(progressBar).toBeInTheDocument();
    await expect(cancelIcons[1]).toHaveAttribute('d', close_circle_outlined.svgPathData);
  },
};

export const TestCustomLoadingTextAndCancel: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    onCancel: fn(),
    isDone: false,
    customLoadingText: 'Custom Loading...',
    indeterminate: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const loadingText = canvas.getByText('Custom Loading...');
    await expect(loadingText).toBeInTheDocument();

    const cancelButton = canvas.getAllByTestId('eds-icon-path')[1];
    await expect(cancelButton).toHaveAttribute('d', close_circle_outlined.svgPathData);

    await userEvent.click(cancelButton);
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

export const TestCompleteStateDefaultText: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isDone: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const completeText = canvas.getByText('File uploaded!');
    const allIcons = canvas.getAllByTestId('eds-icon-path');

    await expect(allIcons[1]).toHaveAttribute('d', delete_to_trash.svgPathData);
    await expect(completeText).toBeInTheDocument();
  },
};

export const TestCompleteStateCustomText: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isDone: true,
    customCompleteText: 'Upload Complete!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const completeText = canvas.getByText('Upload Complete!');
    await expect(completeText).toBeInTheDocument();
  },
};

export const TestErrorStateWithRetry: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    progressPercent: 50,
    isDone: false,
    isError: true,
    fullErrorText: 'Custom error message',
    onRetry: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const allIcons = canvas.getAllByTestId('eds-icon-path');
    await expect(allIcons[2]).toHaveAttribute('d', refresh.svgPathData);

    const errorText = canvas.getByText('Custom error message');
    await expect(errorText).toBeInTheDocument();
  },
};

export const TestErrorStateDefaultText: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    progressPercent: 50,
    isDone: false,
    isError: true,
    onRetry: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorText = canvas.getByText('An error has occurred');
    await expect(errorText).toBeInTheDocument();
  },
};

export const TestDeleteShowsProgressBar: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(() => new Promise<void>((resolve) => setTimeout(() => resolve(), 100))),
    isDone: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => expect(args.onDelete).toHaveBeenCalledTimes(1));
  },
};

export const TestCompactLoadingWithProgress: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    progressPercent: 50,
    isDone: false,
    compact: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');
    await expect(progressBar).toBeInTheDocument();
  },
};

export const TestCompactLoadingIndeterminate: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isDone: false,
    compact: true,
    indeterminate: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');
    await expect(progressBar).toBeInTheDocument();

    const deleteIcon = canvas.getByTestId('eds-icon-path');
    await expect(deleteIcon).toHaveAttribute('d', clear.svgPathData);
    
    // Note: The delete functionality is covered in other tests
    // This test verifies the UI elements are present
  },
};

export const TestCompactCompleteState: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.png'),
    onDelete: fn(),
    isDone: true,
    compact: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const fileName = canvas.getByText((args.file as File).name);
    const progressBar = canvas.queryByRole('progressbar');

    await expect(fileName).toBeInTheDocument();
    await expect(progressBar).not.toBeInTheDocument();
  },
};

export const TestCompactCompleteWhenUndefined: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isDone: true,
    compact: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const fileName = canvas.getByText((args.file as File).name);
    const progressBar = canvas.queryByRole('progressbar');

    await expect(fileName).toBeInTheDocument();
    await expect(progressBar).not.toBeInTheDocument();
  },
};

export const TestCompactPDFIcon: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.pdf'),
    onDelete: fn(),
    isDone: true,
    compact: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByTestId('eds-icon-path');
    // First icon should be the PDF file icon
    await expect(icons[0]).toHaveAttribute('d', library_pdf.svgPathData);
  },
};

export const TestCompactErrorState: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isDone: true,
    isError: true,
    shortErrorText: 'Error!',
    fullErrorText: 'Full error message',
    compact: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shortErrorText = canvas.getByText('Error!');
    const allIcons = canvas.getAllByTestId('eds-icon-path');

    await expect(allIcons[0]).toHaveAttribute('d', error_outlined.svgPathData);
    await expect(shortErrorText).toBeInTheDocument();
  },
};

export const TestCompactDefaultErrorMessages: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: fn(),
    isError: true,
    compact: true,
    indeterminate: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shortDefaultErrorText = canvas.getByText('Invalid file type');
    await expect(shortDefaultErrorText).toBeInTheDocument();
  },
};

export const TestHidesDeleteButtonCompact: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: undefined,
    compact: true,
    indeterminate: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByTestId('delete-file')).not.toBeInTheDocument();
  },
};

export const TestHidesDeleteButtonRegular: Story = {
  tags: ['test-only'],
  args: {
    file: new File(['32452134'], 'testfile.txt'),
    onDelete: undefined,
    indeterminate: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByTestId('delete-file')).not.toBeInTheDocument();
  },
};
