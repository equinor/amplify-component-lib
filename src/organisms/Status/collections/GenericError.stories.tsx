import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react-vite';

import { GenericError } from './GenericError';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

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
      <StatusWrapper>
        <Story />
      </StatusWrapper>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof GenericError>;

export const Default: Story = {
  args: {},
};
