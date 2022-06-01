import { Meta, Story } from '@storybook/react';
import SingleFilterMenu, {
  SingleFilterMenuProps,
} from '../../components/SingleFilterMenu';

export default {
  title: 'SingleFilterMenu',
  component: SingleFilterMenu,
  argTypes: {
    menuTitle: { control: 'text' },
    showChip: { control: 'boolean', required: false },
    chipColor: { control: 'color' },
  },
  args: {
    data: ['Apples', 'Oranges', 'Bananas'],
    onChange: (val) => console.log(val),
    menuTitle: 'Fruity filter',
    showChip: false,
    chipColor: '#ffffff',
  },
} as Meta;

const Template: Story<SingleFilterMenuProps> = (args) => (
  <SingleFilterMenu {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
