import { useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';

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
    uuid: faker.string.uuid(),
    country: faker.location.country(),
  };
}

export const Primary: StoryFn = (args) => {
  const [field, setField] = useState<Field>(fields[0]);
  return (
    <div>
      <Typography variant="h1">
        This component is deprecated! <br />
        See TopBar.FieldSelector instead
      </Typography>
      <FieldSelector
        placement={args.placement}
        availableFields={fields}
        currentField={field}
        onSelect={(selectedField: Field) => setField(selectedField)}
        showAccessITLink={args.showAccessITLink}
      />
    </div>
  );
};
