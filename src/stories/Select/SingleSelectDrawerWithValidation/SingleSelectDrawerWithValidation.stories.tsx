import { FormProvider, useForm } from 'react-hook-form';
import { Meta, Story } from '@storybook/react';
import SingleSelectDrawerWithValidation, {
  SingleSelectDrawerWithValidationProps,
} from '../../../components/Select/SingleSelectDrawerWithValidation';
import { ValueType, items } from '../SelectUtils';

import { SelectItem } from '../../../components/Select';
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

export default {
  title: 'Select/SingleSelectDrawerWithValidation',
  component: SingleSelectDrawerWithValidation,
} as Meta;

const initialItem = '22';

const Template: Story<
  SingleSelectDrawerWithValidationProps<ValueType>
> = () => {
  const [selectedItem, setSelectedItem] = useState<
    SelectItem<ValueType> | undefined
  >(items.find((item) => item.id === initialItem));

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
            onChange={(item) => setSelectedItem(item)}
            initialItem={initialItem}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3">{selectedItem?.label}</Typography>
        </div>
      </div>
    </FormProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
