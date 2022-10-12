import React, { useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import MultiSelectDrawer, { MultiSelectDrawerProps } from './MultiSelectDrawer';
import { items, ValueType } from './SelectUtils';

export default {
  title: 'Inputs/Select/MultiSelectDrawer',
  component: MultiSelectDrawer,
} as Meta;

const Template: Story<MultiSelectDrawerProps<ValueType>> = () => {
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
          label="Test"
          onChange={(val) => setSelectedItems(val)}
          placeholder="Select..."
          initialItems={[items[0], items[3]]}
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

export const Primary = Template.bind({});
Primary.args = {};
