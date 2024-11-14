import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react';

import { GenericError } from './GenericError';

const meta: Meta<typeof GenericError> = {
  title: 'Organisms/Status/Collections/GenericError',
  component: GenericError,
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
type Story = StoryObj<typeof GenericError>;

export const Default: Story = {
  args: {},
};
