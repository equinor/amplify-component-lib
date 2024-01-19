import { Meta, StoryFn } from '@storybook/react';

import FileProgress, {
  FileProgressWithoutProgressProps,
  FileProgressWithProgressProps,
} from './FileProgress';

export default {
  title: 'Feedback/FileProgress',
  component: FileProgress,
  argTypes: {
    compact: { control: 'boolean' },
    file: { control: { type: 'file', accept: '.png, .jpg, .jpeg' } },
    progressPercent: { control: { type: 'range', min: 1, max: 100, step: 1 } },
    isDone: { control: 'boolean' },
    isError: { control: 'boolean' },
    customLoadingText: { control: 'text' },
    customCompleteText: { control: 'text' },
    shortErrorText: { control: 'text' },
    fullErrorText: { control: 'text' },
    onRetry: { control: '' },
  },
  args: {
    compact: false,
    file: { name: 'test', size: 1500000000 },
    progressPercent: 1,
    isDone: false,
    customLoadingText: undefined,
    customCompleteText: undefined,
    isError: false,
    shortErrorText: undefined,
    fullErrorText: undefined,
    onCancel: () => null,
    onRetry: () => null,
    onDelete: () => null,
  },
} as Meta;

export const Primary: StoryFn<
  FileProgressWithProgressProps | FileProgressWithoutProgressProps
> = (args) => <FileProgress {...args} />;
