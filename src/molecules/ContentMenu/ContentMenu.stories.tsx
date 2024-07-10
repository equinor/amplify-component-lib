import { useState } from 'react';

import { StoryFn } from '@storybook/react';

import {
  ContentMenu,
  ContentMenuProps,
} from 'src/molecules/ContentMenu/ContentMenu';

export default {
  title: 'Inputs/ContentMenu',
  component: ContentMenu,
  argTypes: {
    items: {
      control: 'array',
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
