import { Meta, StoryFn } from '@storybook/react-vite';

import {
  SingleFilterMenu,
  SingleFilterMenuProps,
} from 'src/molecules/SingleFilterMenu/SingleFilterMenu';

const meta: Meta<typeof SingleFilterMenu> = {
  title: 'Molecules/SingleFilterMenu',
  component: SingleFilterMenu,
  argTypes: {
    menuTitle: { control: 'text' },
    showChip: { control: 'boolean', required: false },
    chipColor: { control: 'color' },
  },
  args: {
    data: ['Apples', 'Oranges', 'Bananas'],
    menuTitle: 'Fruity filter',
    showChip: false,
    chipColor: '#ffffff',
  },
};

export default meta;

export const Primary: StoryFn<SingleFilterMenuProps> = (args) => (
  <SingleFilterMenu {...args} />
);
