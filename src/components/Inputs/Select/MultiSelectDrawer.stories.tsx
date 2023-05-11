import React, { useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import MultiSelectDrawer from './MultiSelectDrawer';
import { items, ValueType } from './SelectUtils';

export default {
  title: 'Inputs/Select/MultiSelectDrawer',
  component: MultiSelectDrawer,
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
  const [selectedItems, setSelectedItems] = useState<ValueType[]>([
    items[0],
    items[3],
  ]);

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
        <MultiSelectDrawer<ValueType>
          items={items}
          disabled={args.disabled}
          meta={args.meta}
          label={args.label}
          onChange={(val) => setSelectedItems(val)}
          placeholder={
            selectedItems.length
              ? selectedItems.map((s) => s.label).join(', ')
              : args.placeholder
          }
          selectedItems={selectedItems}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {selectedItems.map((value) => (
          <Typography key={value.id} variant="h3">
            {value.label}
          </Typography>
        ))}
      </div>
    </div>
  );
};
