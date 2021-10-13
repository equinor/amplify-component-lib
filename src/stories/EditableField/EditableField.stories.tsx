import { SingleSelect } from '@equinor/eds-core-react';
import { Story, Meta } from '@storybook/react';

import EditableField, {
  EditableFieldProps,
} from '../../components/EditableField';

export default {
  title: 'EditableField',
  component: EditableField,
  argTypes: {
    editable: { control: 'boolean', defaultValue: true },
    value: { control: 'text', defaultValue: 'Initial value' },
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
