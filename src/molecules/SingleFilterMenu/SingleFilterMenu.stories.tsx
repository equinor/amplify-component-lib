import { Meta, StoryFn } from '@storybook/react';

import {
  SingleFilterMenu,
  SingleFilterMenuProps,
} from 'src/molecules/SingleFilterMenu/SingleFilterMenu';

export default {
  title: 'Molecules/SingleFilterMenu',
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
