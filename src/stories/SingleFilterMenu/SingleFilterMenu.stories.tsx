import { Story, Meta } from '@storybook/react';

import SingleFilterMenu, {
  SingleFilterMenuProps,
} from '../../components/SingleFilterMenu';

export default {
  title: 'SingleFilterMenu',
  component: SingleFilterMenu,
  argTypes: {
    menuTitle: { control: 'text', defaultValue: 'Fruity filter' },
    showChip: { control: 'boolean', defaultValue: false, required: false },
    chipColor: { control: 'color', defaultValue: '#ffffff' },
  },
  args: {
    data: ['Apples', 'Oranges', 'Bananas'],
    onChange: (val) => console.log(val),
  },
} as Meta;

const Template: Story<SingleFilterMenuProps> = (args) => (
  <SingleFilterMenu {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
