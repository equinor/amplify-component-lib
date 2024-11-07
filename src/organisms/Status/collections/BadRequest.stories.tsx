import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react';

import { BadRequest } from './BadRequest';

const meta: Meta<typeof BadRequest> = {
  title: 'Organisms/Status/Collections/BadRequest',
  component: BadRequest,
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
type Story = StoryObj<typeof BadRequest>;

export const Default: Story = {
  args: {},
};
