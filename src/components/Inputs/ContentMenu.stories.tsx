import { useState } from 'react';

import { Story } from '@storybook/react';

import ContentMenu, { ContentMenuProps } from './ContentMenu';

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
      },
      {
        value: 'halliburton',
        label: 'Halliburton',
      },
    ],
    isLoading: false,
  },
};

export const Primary: Story<ContentMenuProps> = (args) => {
  const [value, setValue] = useState(args.items.at(0)?.value ?? '');

  const handleOnChange = (newValue: string) => {
    setValue(newValue);
  };
  return <ContentMenu {...args} value={value} onChange={handleOnChange} />;
};
Primary.parameters = {
  backgrounds: { default: 'Equinor off-white' },
};
