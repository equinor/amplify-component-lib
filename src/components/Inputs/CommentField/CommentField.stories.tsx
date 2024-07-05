import { Meta, StoryFn } from '@storybook/react';

import CommentField, { CommentFieldProps } from './CommentField';

export default {
  title: 'Deprecated/Inputs/CommentField',
  component: CommentField,
  parameters: {
    docs: {
      description: {
        component:
          'Shows a comment field component that sends onChange events debounced by 600ms.',
      },
    },
  },
  argTypes: {
    onChange: { action: 'onChange ran' },
    onDelete: { action: 'onDelete ran' },
  },
  args: {
    value: 'I am a comment',
    createdDate: '10.10.2020',
    id: 'comment-id-123',
  },
} as Meta;

export const Primary: StoryFn<CommentFieldProps> = (args) => (
  <CommentField {...args} />
);
