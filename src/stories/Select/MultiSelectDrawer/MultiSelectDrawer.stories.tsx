import { Meta, Story } from '@storybook/react';
import MultiSelectDrawer, {
  MultiSelectDrawerProps,
} from '../../../components/Select/MultiSelectDrawer';

import { SelectItem } from '../../../components/Select';
import { useState } from 'react';

export default {
  title: 'Select/MultiSelectDrawer',
  component: MultiSelectDrawer,
} as Meta;

type KeyValue = { key: string; value: number };

const items: SelectItem<KeyValue>[] = [
  {
    value: { key: 'One', value: 1 },
    label: 'One',
    items: [
      { value: { key: 'OneOne', value: 11 }, label: 'OneOne', items: [] },
      { value: { key: 'OneTwo', value: 12 }, label: 'OneTwo', items: [] },
      { value: { key: 'OneThree', value: 13 }, label: 'OneThree', items: [] },
    ],
  },
  {
    value: { key: 'Two', value: 2 },
    label: 'Two',
    items: [
      { value: { key: 'TwoOne', value: 21 }, label: 'TwoOne', items: [] },
      { value: { key: 'TwoTwo', value: 22 }, label: 'TwoTwo', items: [] },
      { value: { key: 'TwoThree', value: 23 }, label: 'TwoThree', items: [] },
    ],
  },
  {
    value: { key: 'Three', value: 3 },
    label: 'Three',
    items: [
      { value: { key: 'ThreeOne', value: 31 }, label: 'ThreeOne', items: [] },
      { value: { key: 'ThreeTwo', value: 32 }, label: 'ThreeTwo', items: [] },
      {
        value: { key: 'ThreeThree', value: 33 },
        label: 'ThreeThree',
        items: [],
      },
    ],
  },
];

const Template: Story<MultiSelectDrawerProps<KeyValue>> = () => {
  const [selectedItems, setSelectedItems] = useState(items);

  return (
    <div style={{ width: '300px' }}>
      <MultiSelectDrawer
        items={selectedItems}
        label="Test"
        onChange={(values) => setSelectedItems(values)}
        placeholder="Select..."
        compare={(item1, item2) => {
          return item1.key === item2.key;
        }}
        initialSelectedItems={[
          {
            value: { key: 'Two', value: 2 },
            label: 'Two',
            items: [
              {
                value: { key: 'TwoOne', value: 21 },
                label: 'TwoOne',
                items: [],
              },
              {
                value: { key: 'TwoTwo', value: 22 },
                label: 'TwoTwo',
                items: [],
              },
              {
                value: { key: 'TwoThree', value: 23 },
                label: 'TwoThree',
                items: [],
              },
            ],
          },
          {
            value: { key: 'ThreeOne', value: 31 },
            label: 'ThreeOne',
            items: [],
          },
        ]}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
