import { Meta, Story } from '@storybook/react';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from '../../../components/Select/SingleSelectDrawer';

import { SelectItem } from '../../../components/Select';
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

export default {
  title: 'Select/SingleSelectDrawer',
  component: SingleSelectDrawer,
} as Meta;

type KeyValue = { key: string; value: number };

const items: SelectItem<KeyValue>[] = [
  {
    id: '1',
    object: { key: 'One', value: 1 },
    label: 'One',
    items: [
      {
        id: '11',
        object: { key: 'OneOne', value: 11 },
        label: 'OneOne',
        items: [],
      },
      {
        id: '12',
        object: { key: 'OneTwo', value: 12 },
        label: 'OneTwo',
        items: [],
      },
      {
        id: '13',
        object: { key: 'OneThree', value: 13 },
        label: 'OneThree',
        items: [],
      },
    ],
  },
  {
    id: '2',
    object: { key: 'Two', value: 2 },
    label: 'Two',
    items: [
      {
        id: '21',
        object: { key: 'TwoOne', value: 21 },
        label: 'TwoOne',
        items: [],
      },
      {
        id: '22',
        object: { key: 'TwoTwo', value: 22 },
        label: 'TwoTwo',
        items: [],
      },
      {
        id: '23',
        object: { key: 'TwoThree', value: 23 },
        label: 'TwoThree',
        items: [],
      },
    ],
  },
  {
    id: '3',
    object: { key: 'Three', value: 3 },
    label: 'Three',
    items: [
      {
        id: '31',
        object: { key: 'ThreeOne', value: 31 },
        label: 'ThreeOne',
        items: [],
      },
      {
        id: '32',
        object: { key: 'ThreeTwo', value: 32 },
        label: 'ThreeTwo',
        items: [],
      },
      {
        id: '33',
        object: { key: 'ThreeThree', value: 33 },
        label: 'ThreeThree',
        items: [],
      },
    ],
  },
];

const Template: Story<SingleSelectDrawerProps<KeyValue>> = () => {
  const [selectedItem, setSelectedItem] = useState('1');

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
        <SingleSelectDrawer<KeyValue>
          label="Test"
          value="test"
          items={items}
          initialSelectedItem={selectedItem}
          placeholder="Select..."
          onChange={(item) => setSelectedItem(item)}
        />
      </div>
      <div>
        <Typography variant="h3">{selectedItem}</Typography>
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

export const InitialValue = Template.bind({});
InitialValue.args = { initialSelectedItem: '22' };
