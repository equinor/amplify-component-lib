import { Story, Meta } from '@storybook/react';

import NewCommentField, {
  NewCommentFieldProps,
} from '../../../components/CommentField/NewComment';

export default {
  title: 'CommentField/NewCommentField',
  component: NewCommentField,
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: 'Publish comment with button or the Enter key',
    },
    label: { control: 'text', defaultValue: 'Label' },
    onPublish: {
      name: 'See console for publish output',
      defaultValue: (value) =>
        console.log('OnPublish triggered with value: ' + value),
    },
  },
} as Meta;

const Template: Story<NewCommentFieldProps> = (args) => {
  return <NewCommentField {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
