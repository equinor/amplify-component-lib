import { Story } from '@storybook/react';

import Sieve, { SieveProps } from './Sieve';

export default {
  title: 'Inputs/Sieve',
  component: Sieve,
  argTypes: {
    searchPlaceholder: {
      control: 'text',
    },
    sortOptions: {
      control: 'array',
    },
    filterOptions: {
      control: 'array',
    },
    onUpdate: { action: 'Ran on update' },
  },
  args: {
    searchPlaceholder: 'Write to search for...',
    sortOptions: [
      {
        value: '123',
        label: 'Numeric',
      },
      {
        value: 'az',
        label: 'Alphabetically',
      },
    ],
    filterOptions: [
      {
        label: 'Technology',
        options: [
          {
            value: '123',
            label: 'Gamma ray',
          },
          {
            value: '321',
            label: 'Neutron',
          },
        ],
      },
      {
        label: 'Section',
        options: [
          {
            value: '55',
            label: '26"',
          },
          {
            value: '89',
            label: '20"',
          },
        ],
      },
    ],
  },
};

export const Primary: Story<SieveProps> = (args) => {
  return <Sieve {...args} />;
};
Primary.parameters = {
  backgrounds: { default: 'Equinor off-white' },
};
