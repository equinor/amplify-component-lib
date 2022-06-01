import { FormProvider, useForm } from 'react-hook-form';
import { Meta, Story } from '@storybook/react';
import SingleSelectDrawerWithValidation, {
  SingleSelectDrawerWithValidationProps,
} from '../../../components/Select/SingleSelectDrawerWithValidation';

import { SelectItem } from '../../../components/Select';
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

export default {
  title: 'Select/SingleSelectDrawerWithValidation',
  component: SingleSelectDrawerWithValidation,
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

const Template: Story<SingleSelectDrawerWithValidationProps<KeyValue>> = () => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>('22');
  const methods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });

  return (
    <FormProvider {...methods}>
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
          <SingleSelectDrawerWithValidation
            id="test"
            items={items}
            label="Test"
            placeholder="Select..."
            rules={{ required: true }}
            selectedValue={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3">{selectedItem}</Typography>
        </div>
      </div>
    </FormProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
