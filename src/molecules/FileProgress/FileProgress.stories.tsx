import { useEffect, useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { FileProgress } from 'src/molecules/FileProgress/FileProgress';
import { FileProgressProps } from 'src/molecules/FileProgress/FileProgress.types';

import { expect, fn, userEvent } from 'storybook/test';

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

type Story = StoryObj<typeof FileProgress>;

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

export const TestCompactCompleted: Story = {
  args: {
    indeterminate: true,
    isDone: true,
    compact: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img')).toBeInTheDocument();
  },
};

export const TestCompactCompletedBasic: Story = {
  args: {
    indeterminate: true,
    isDone: true,
    compact: true,
    file: new File([], 'basic.txt', { type: 'text/plain' }),
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};

export const TestOnError: Story = {
  tags: ['test-only'],
  args: {
    indeterminate: false,
    isError: true,
    isDone: undefined,
    fullErrorText: 'This is a full error text for testing purposes.',
    shortErrorText: 'Short error',
    compact: true,
    onDelete: fn(),
    onCancel: undefined,
  },
  play: async ({ canvas, args }) => {
    if (args.compact) {
      await expect(
        canvas.getByText(args.shortErrorText ?? '')
      ).toBeInTheDocument();
    }
  },
};

export const TestOnDelete: Story = {
  tags: ['test-only'],
  args: {
    indeterminate: true,
    compact: true,
    onDelete: fn(),
    onCancel: undefined,
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByTestId('delete-file'));

    await expect(args.onDelete).toHaveBeenCalledOnce();
  },
};

export const TestOnDeleteProgress: Story = {
  tags: ['test-only'],
  args: {
    indeterminate: true,
    compact: false,
    onDelete: async () => {
      return new Promise((resolve) => setTimeout(() => resolve(), 2000));
    },
    onCancel: undefined,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByTestId('delete-file'));

    await expect(canvas.getAllByRole('progressbar')).toHaveLength(2);
  },
};

export const TestOnCancel: Story = {
  tags: ['test-only'],
  args: {
    indeterminate: true,
    compact: false,
    isDone: false,
    onCancel: fn(),
    onDelete: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByTestId('delete-file'));

    await expect(args.onCancel).toHaveBeenCalledOnce();
  },
};
