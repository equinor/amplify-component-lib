import EditableField, {
  EditableFieldProps,
} from '../../components/EditableField';
import { Meta, Story } from '@storybook/react';

import { SingleSelect } from '@equinor/eds-core-react';

export default {
  title: 'EditableField',
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

export const Select = Template.bind({});
Select.args = {
  inputField: <SingleSelect label="Select" items={['1', '2', '3']} />,
};
