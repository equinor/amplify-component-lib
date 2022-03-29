import { Story, Meta } from '@storybook/react';

import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from '../../../components/Select/SingleSelectDrawer';

export default {
  title: 'Select/SingleSelectDrawer',
  component: SingleSelectDrawer,
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
  },
} as Meta;

const Template: Story<SingleSelectDrawerProps> = (args) => (
  <div style={{ width: '300px' }}>
    <SingleSelectDrawer {...args} onChange={() => null} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const InitialValue = Template.bind({});
InitialValue.args = { initialSelectedItem: '2' };
