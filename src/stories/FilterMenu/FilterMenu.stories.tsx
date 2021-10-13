import { filter_list } from '@equinor/eds-icons';
import { Story, Meta } from '@storybook/react';

import FilterMenu, { IComponentProps } from '../../components/FilterMenu';

export default {
  title: 'FilterMenu',
  component: FilterMenu,
  argTypes: {
    menuTitle: { defaultValue: 'Menu Title' },
    data: { defaultValue: ['Item 1', 'Item 2', 'Apple'] },
    icon: { defaultValue: filter_list },
  },
} as Meta;

const Template: Story<IComponentProps> = (args) => <FilterMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
