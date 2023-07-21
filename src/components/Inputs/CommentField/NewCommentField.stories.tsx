import { Meta, StoryFn } from '@storybook/react';

import NewCommentField, { NewCommentFieldProps } from './NewCommentField';

export default {
  title: 'Inputs/CommentField/NewCommentField',
  component: NewCommentField,
  argTypes: {
    placeholder: {
      control: 'text',
    },
    label: { control: 'text' },
    onPublish: {
      action: 'Ran onPublish',
    },
  },
  args: {
    placeholder: 'Publish comment with button or the Enter key',
    label: 'Label',
  },
} as Meta;

const Template: StoryFn<NewCommentFieldProps> = (args) => {
  return <NewCommentField {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
