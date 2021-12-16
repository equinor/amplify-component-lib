import { Story, Meta } from '@storybook/react';
import faker from 'faker';

import FieldSelector from '../../components/FieldSelector';

export default {
  title: 'FieldSelector',
  component: FieldSelector,
} as Meta;

function FakeField() {
  return {
    name: faker.lorem.word(),
    guid: faker.datatype.uuid(),
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
