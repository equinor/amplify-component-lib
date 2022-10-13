import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import FieldSelector from './FieldSelector';

export default {
  title: 'Inputs/FieldSelector',
  component: FieldSelector,
} as Meta;

function FakeField() {
  return {
    name: faker.lorem.word(),
    uuid: faker.datatype.uuid(),
    country: faker.address.country(),
  };
}

export const Primary: Story = () => {
  const fields = new Array(3).fill(0).map(() => FakeField());
  return (
    <FieldSelector
      availableFields={fields}
      currentField={fields[0]}
      onSelect={() => console.log('🎉')}
    />
  );
};

export const WithoutSelect: Story = () => {
  const fields = new Array(3).fill(0).map(() => FakeField());
  return (
    <FieldSelector
      availableFields={fields}
      onSelect={() => console.log('🎉')}
    />
  );
};

export const HidingAccessITLink: Story = () => {
  const fields = new Array(3).fill(0).map(() => FakeField());
  return (
    <FieldSelector
      availableFields={fields}
      onSelect={() => console.log('🎉')}
      showAccessITLink={false}
    />
  );
};
