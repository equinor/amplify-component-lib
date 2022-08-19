import EditableField, { EditableFieldProps } from './EditableField';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Inputs/EditableField',
  component: EditableField,
  argTypes: {
    editable: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    editable: true,
    value: 'Initial value',
  },
} as Meta;

const Template: Story<EditableFieldProps> = (args) => (
  <EditableField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
