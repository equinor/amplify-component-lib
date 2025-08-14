import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import {
  ContentMenu,
  ContentMenuProps,
} from 'src/molecules/ContentMenu/ContentMenu';

const meta: Meta<typeof ContentMenu> = {
  title: 'Molecules/ContentMenu',
  component: ContentMenu,
  argTypes: {
    items: {
      control: 'object',
    },
    isLoading: {
      control: 'boolean',
    },
  },
  args: {
    items: [
      {
        value: 'baker-hughes',
        label: 'Baker hughes',
      },
      {
        value: 'slb',
        label: 'SLB',
        children: [
          { value: 'child 11', label: 'ch11' },
          { value: 'child 21', label: 'ch22' },
        ],
      },
      {
        value: 'halliburton',
        label: 'Halliburton',
        children: [
          { value: 'child 1', label: 'ch1' },
          { value: 'child 2', label: 'ch2' },
        ],
      },
    ],
    isLoading: false,
  },
};

export default meta;

export const Primary: StoryFn<ContentMenuProps> = (args) => {
  const [value, setValue] = useState(args.items.at(0)?.value ?? '');

  const handleOnChange = (newValue: string) => {
    setValue(newValue);
  };
  return <ContentMenu {...args} value={value} onChange={handleOnChange} />;
};
Primary.parameters = {
  backgrounds: { default: 'Equinor off-white' },
};
