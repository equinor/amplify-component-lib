import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react';

import { MissingPermissions } from './MissingPermissions';

const meta: Meta<typeof MissingPermissions> = {
  title: 'Organisms/Status/Collections/MissingPermissions',
  component: MissingPermissions,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
  decorators: (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof MissingPermissions>;

export const Default: Story = {
  args: {},
};
