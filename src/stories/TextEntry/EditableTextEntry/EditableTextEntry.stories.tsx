import { Story, Meta } from '@storybook/react';

import EditableTextEntry, { EditableTextEntryProps } from './EditableTextEntry';

export default {
  title: 'TextEntry/EditableTextEntry',
  component: EditableTextEntry,
  argTypes: {
    body: { control: 'text', defaultValue: 'Value' },
  },
} as Meta;

const Template: Story<EditableTextEntryProps> = (args) => (
  <EditableTextEntry {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
