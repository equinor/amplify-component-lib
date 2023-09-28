import { useState } from 'react';
import { MemoryRouter } from 'react-router';

import { actions } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import Sieve, { SieveProps, SieveValue } from './Sieve';

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
    showChips: { control: 'boolean' },
    debounceSearchValue: { control: 'boolean' },
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
    showChips: true,
    debounceSearchValue: false,
  },
};

export const Primary: StoryFn<SieveProps> = (args) => {
  const [sieveValue, setSieveValue] = useState<SieveValue>({
    searchValue: 'hei',
    filterValues: undefined,
    sortValue: {
      value: '123',
      label: 'Numeric',
    },
  });

  const handleOnIsTyping = (value: boolean) => {
    if (args.debounceSearchValue) {
      actions('onIsTyping').onIsTyping(value);
    }
  };

  const handleOnUpdate = (value: SieveValue) => {
    actions('onUpdate').onUpdate(value);
    setSieveValue(value);
  };

  return (
    <MemoryRouter initialEntries={['/']}>
      <Sieve
        {...args}
        sieveValue={sieveValue}
        onUpdate={handleOnUpdate}
        onIsTyping={handleOnIsTyping}
      />
    </MemoryRouter>
  );
};
Primary.parameters = {
  backgrounds: { default: 'Equinor off-white' },
};
