/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // file is deprecated so no need to fix
import React, { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import SingleSelectDrawer from 'src/deprecated/SingleSelectDrawer';
import { Typography } from 'src/molecules';
import { items, ValueType } from 'src/molecules/OptionDrawer/stories/data';

export default {
  title: 'Deprecated/SingleSelectDrawer',
  component: SingleSelectDrawer,
  argTypes: {
    label: { control: 'text' },
    meta: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Test',
    meta: 'Meta',
    placeholder: 'Select...',
    disabled: false,
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const [selectedItem, setSelectedItem] = useState<ValueType | undefined>(
    items[0]
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <div
        style={{
          width: '300px',
        }}
      >
        <SingleSelectDrawer<ValueType>
          label={args.label}
          disabled={args.disabled}
          meta={args.meta}
          items={items}
          initialItem={items[0]}
          placeholder={args.placeholder}
          onChange={(item) => setSelectedItem(item)}
        />
      </div>
      <div>
        <Typography variant="h3">{selectedItem?.label}</Typography>
      </div>
    </div>
  );
};
