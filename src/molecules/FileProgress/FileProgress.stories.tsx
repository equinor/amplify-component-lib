import { Meta, StoryFn } from '@storybook/react';

import {
  CompactFileProgressBaseProps,
  FileProgress,
  RegularFileProgressBaseProps,
} from 'src/molecules/FileProgress/FileProgress';

export default {
  title: 'Feedback/FileProgress',
  component: FileProgress,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19751&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
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
  RegularFileProgressBaseProps | CompactFileProgressBaseProps
> = (args) => <FileProgress {...args} />;
