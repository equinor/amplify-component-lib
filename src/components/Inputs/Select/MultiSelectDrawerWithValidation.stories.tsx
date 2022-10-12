import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Typography } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import MultiSelectDrawerWithValidation, {
  MultiSelectDrawerWithValidationProps,
} from './MultiSelectDrawerWithValidation';
import { items, ValueType } from './SelectUtils';

export default {
  title: 'Inputs/Select/MultiSelectDrawerWithValidation',
  component: MultiSelectDrawerWithValidation,
} as Meta;

const Template: Story<MultiSelectDrawerWithValidationProps<ValueType>> = () => {
  const [selectedItems, setSelectedItems] = useState<ValueType[]>([
    items[0],
    items[3],
  ]);
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
          <MultiSelectDrawerWithValidation
            id="test"
            items={items}
            label="Test"
            onChange={(val) => setSelectedItems(val)}
            placeholder="Select..."
            rules={{ required: true }}
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
    </FormProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
