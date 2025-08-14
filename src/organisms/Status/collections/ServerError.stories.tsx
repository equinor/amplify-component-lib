import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react-vite';

import { ServerError } from './ServerError';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

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
      <StatusWrapper>
        <Story />
      </StatusWrapper>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof ServerError>;

export const Default: Story = {
  args: {},
};
