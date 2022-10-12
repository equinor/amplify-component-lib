import { Meta, Story } from '@storybook/react';

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
      name: 'See console for publish output',
    },
  },
  args: {
    placeholder: 'Publish comment with button or the Enter key',
    label: 'Label',
    onPublish: (value: string) =>
      console.log('OnPublish triggered with value: ' + value),
  },
} as Meta;

const Template: Story<NewCommentFieldProps> = (args) => {
  return <NewCommentField {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
