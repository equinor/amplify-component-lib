import { Story, Meta } from '@storybook/react';

import Select, { SelectProps } from '../../../components/Select';

export default {
  title: 'Select/SelectDrawer',
  component: Select,
  argTypes: {
    items: {
      control: 'array',
      defaultValue: [
        {
          value: 1,
          label: 'One',
          children: [
            { value: 11, label: 'One', children: [] },
            { value: 12, label: 'Two', children: [] },
            { value: 13, label: 'Three', children: [] },
          ],
        },
        {
          value: 2,
          label: 'Two',
          children: [
            { value: 21, label: 'One', children: [] },
            { value: 22, label: 'Two', children: [] },
            { value: 23, label: 'Three', children: [] },
          ],
        },
        {
          value: 3,
          label: 'Three',
          children: [
            { value: 31, label: 'One', children: [] },
            { value: 32, label: 'Two', children: [] },
            { value: 33, label: 'Three', children: [] },
          ],
        },
      ],
    },
    values: { control: 'array', defaultValue: [] },
  },
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
