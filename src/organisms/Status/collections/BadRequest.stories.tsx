import { MemoryRouter } from 'react-router';

import { Meta, StoryObj } from '@storybook/react-vite';

import { BadRequest } from './BadRequest';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

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
      <StatusWrapper>
        <Story />
      </StatusWrapper>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof BadRequest>;

export const Default: Story = {
  args: {},
};
