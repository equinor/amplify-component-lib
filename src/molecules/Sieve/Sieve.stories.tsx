import { useState } from 'react';
import { MemoryRouter } from 'react-router';

import { Meta, StoryFn } from '@storybook/react-vite';

import { Sieve } from 'src/molecules/Sieve/Sieve';
import { SieveProps, SieveValue } from 'src/molecules/Sieve/Sieve.types';

import { actions } from 'storybook/actions';

const meta: Meta<typeof Sieve> = {
  title: 'Molecules/Sieve',
  component: Sieve,
  argTypes: {
    searchPlaceholder: {
      control: 'text',
    },
    sortOptions: {
      control: 'object',
    },
    filterOptions: {
      control: 'object',
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

export default meta;

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
