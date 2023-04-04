import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import { Field } from '../../types/Field';
import FieldSelector from './FieldSelector';
const fields = new Array(10).fill(0).map(() => FakeField());

export default {
  title: 'Inputs/FieldSelector',
  component: FieldSelector,
  argTypes: {
    showAccessITLink: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom', 'bottom-end'],
    },
  },
  args: { showAccessITLink: true, placement: 'bottom-start' },
} as Meta;

function FakeField() {
  return {
    name: faker.lorem.word(),
    uuid: faker.datatype.uuid(),
    country: faker.address.country(),
  };
}

export const Primary: Story = (args) => {
  const [field, setField] = useState<Field>(fields[0]);
  return (
    <FieldSelector
      placement={args.placement}
      availableFields={fields}
      currentField={field}
      onSelect={(selectedField: Field) => setField(selectedField)}
      showAccessITLink={args.showAccessITLink}
    />
  );
};
