import { Meta, Story } from '@storybook/react';
import SingleSelectDrawer, {
  SingleSelectDrawerProps,
} from '../../../components/Select/SingleSelectDrawer';

import { SelectItem } from '../../../components/Select';

export default {
  title: 'Select/SingleSelectDrawer',
  component: SingleSelectDrawer,
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

const Template: Story<SingleSelectDrawerProps<KeyValue>> = () => (
  <div style={{ width: '300px' }}>
    <SingleSelectDrawer
      label="Test"
      value="test"
      items={items}
      onChange={() => null}
      compare={(item1, item2) => {
        return item1?.key === item2?.key;
      }}
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const InitialValue = Template.bind({});
InitialValue.args = { initialSelectedItem: '22' };
