import { Story, Meta } from '@storybook/react';

import { NotFound } from '../../components';

export default {
  title: 'NotFound',
  component: NotFound,
} as Meta;

export const Template: Story = () => (
  <NotFound
    onBack={() => console.log('We have to go back 🔙')}
    backLabel="Back to last page"
  />
);
