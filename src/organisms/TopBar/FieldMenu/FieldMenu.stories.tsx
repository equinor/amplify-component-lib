import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Field } from 'src/atoms/types/Field';
import {
  FieldMenu,
  FieldMenuProps,
} from 'src/organisms/TopBar/FieldMenu/FieldMenu';
const fields = new Array(5).fill(0).map(() => FakeField());

export default {
  title: 'Organisms/TopBar/FieldSelector',
  component: FieldMenu,
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

export const Primary: StoryFn<FieldMenuProps> = (args) => {
  const [field, setField] = useState<Field>(fields[0]);
  return (
    <FieldMenu
      availableFields={fields}
      currentField={field}
      onSelect={(selectedField: Field) => setField(selectedField)}
      showAccessITLink={args.showAccessITLink}
    />
  );
};
