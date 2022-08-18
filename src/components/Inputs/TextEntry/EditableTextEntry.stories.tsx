import EditableTextEntry, { EditableTextEntryProps } from './EditableTextEntry';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Inputs/TextEntry/EditableTextEntry',
  component: EditableTextEntry,
  argTypes: {
    body: { control: 'text' },
  },
  args: {
    body: 'Value',
  },
} as Meta;

const Template: Story<EditableTextEntryProps> = (args) => (
  <EditableTextEntry {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
