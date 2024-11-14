import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react';

import { ServerError } from './ServerError';

const meta: Meta<typeof ServerError> = {
  title: 'Organisms/Status/Collections/ServerError',
  component: ServerError,
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
type Story = StoryObj<typeof ServerError>;

export const Default: Story = {
  args: {},
};
