import { Story, Meta } from '@storybook/react';

import MultiSelectDrawer, {
  MultiSelectDrawerProps,
} from '../../../components/Select/MultiSelectDrawer';

export default {
  title: 'Select/MultiSelectDrawer',
  component: MultiSelectDrawer,
  argTypes: {
    items: {
      control: 'array',
      defaultValue: [
        {
          value: '1',
          label: 'One',
          children: [
            { value: '11', label: 'One', children: [] },
            { value: '12', label: 'Two', children: [] },
            { value: '13', label: 'Three', children: [] },
          ],
        },
        {
          value: '2',
          label: 'Two',
          children: [
            { value: '21', label: 'One', children: [] },
            { value: '22', label: 'Two', children: [] },
            { value: '23', label: 'Three', children: [] },
          ],
        },
        {
          value: '3',
          label: 'Three',
          children: [
            { value: '31', label: 'One', children: [] },
            { value: '32', label: 'Two', children: [] },
            { value: '33', label: 'Three', children: [] },
          ],
        },
      ],
    },
    initialSelectedItems: { control: 'array', defaultValue: ['1', '3'] },
  },
} as Meta;

const Template: Story<MultiSelectDrawerProps> = (args) => (
  <div style={{ width: '300px' }}>
    <MultiSelectDrawer
      {...args}
      onChange={(values) => console.log(values)}
      placeholder="Select..."
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
