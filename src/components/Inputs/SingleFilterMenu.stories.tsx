import { Meta, StoryFn } from '@storybook/react';

import SingleFilterMenu, { SingleFilterMenuProps } from './SingleFilterMenu';

export default {
  title: 'Inputs/SingleFilterMenu',
  component: SingleFilterMenu,
  argTypes: {
    menuTitle: { control: 'text' },
    showChip: { control: 'boolean', required: false },
    chipColor: { control: 'color' },
  },
  args: {
    data: ['Apples', 'Oranges', 'Bananas'],
    onChange: (val: string) => console.log(val),
    menuTitle: 'Fruity filter',
    showChip: false,
    chipColor: '#ffffff',
  },
} as Meta;

export const Primary: StoryFn<SingleFilterMenuProps> = (args) => (
  <SingleFilterMenu {...args} />
);
