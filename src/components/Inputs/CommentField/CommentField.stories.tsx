import CommentField, { CommentFieldProps } from './CommentField';
import { Meta, Story } from '@storybook/react';

import { Typography } from '@equinor/eds-core-react';

export default {
  title: 'Inputs/CommentField/CommentField',
  component: CommentField,
} as Meta;

const Template: Story<CommentFieldProps> = (args) => (
  <div>
    <Typography>See console for change and delete output</Typography>
    <CommentField {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  value: 'I am a comment',
  createdDate: '10.10.2020',
  id: 'comment-id-123',
  onChange: (value) => console.log('OnChange triggered with value: ' + value),
  onDelete: (value) => console.log('OnDelete triggered with value: ' + value),
};
