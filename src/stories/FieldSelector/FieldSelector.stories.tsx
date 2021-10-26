import { Story, Meta } from '@storybook/react';

import FieldSelector, {
  FieldSelectorType,
} from '../../components/FieldSelector';

export default {
  title: 'FieldSelector',
  component: FieldSelector,
} as Meta;

const defaultProps: FieldSelectorType = {
  currentField: {
    name: 'Johan Sverdrup',
    guid: '123123123',
    country: 'Norway',
  },
  availableFields: [
    {
      name: 'Johan Sverdrup',
      guid: '123123123',
      country: 'Norway',
    },
    {
      name: 'Martin Linge',
      guid: '123423634',
      country: 'Norway',
    },
  ],
  onSelect: (field) => console.log(field),
};

export const Primary: Story = () => <FieldSelector {...defaultProps} />;
