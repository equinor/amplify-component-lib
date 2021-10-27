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
    name: 'JOHAN SVERDRUP',
    guid: '123123123',
    country: 'Norway',
  },
  availableFields: [
    {
      name: 'JOHAN SVERDRUP',
      guid: '123123123',
      country: 'Norway',
    },
    {
      name: 'MARTIN LINGE',
      guid: '123423634',
      country: 'Norway',
    },
  ],
  onSelect: (field) => console.log(field),
};

export const Primary: Story = () => <FieldSelector {...defaultProps} />;
