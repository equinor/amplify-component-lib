import { Typography } from '@equinor/eds-core-react';
import { Story, Meta } from '@storybook/react';
import CommentField, { CommentFieldProps } from '../../components/CommentField';

// id: string;
//   value: string;
//   createdDate?: string;
//   onChange: (value: string) => void;
//   onDelete: () => void;

export default {
  title: 'CommentField/CommentField',
  component: CommentField,
  argTypes: {
    value: { control: 'text', defaultValue: 'I am a comment' },
    createdDate: { control: 'text', defaultValue: '10.10.2020' },
    id: { table: { disable: true }, defaultValue: 'comment-id-123' },
    onChange: {
      defaultValue: (value) =>
        console.log('OnChange triggered with value: ' + value),
    },
    onDelete: {
      defaultValue: (value) =>
        console.log('OnDelete triggered with value: ' + value),
    },
  },
} as Meta;

const Template: Story<CommentFieldProps> = (args) => (
  <div>
    <Typography>See console for change and delete output</Typography>
    <CommentField {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
