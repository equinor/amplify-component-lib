import { useEffect, useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { FileProgress } from 'src/molecules/FileProgress/FileProgress';
import { FileProgressProps } from 'src/molecules/FileProgress/FileProgress.types';

const meta: Meta<typeof FileProgress> = {
  title: 'Molecules/FileProgress',
  component: FileProgress,
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
    file: new File([], 'Image.png'),
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

export const Primary: StoryFn<FileProgressProps> = (args) => {
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
