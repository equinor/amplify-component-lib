import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react-vite';

import { ApiResponseError } from './ApiResponseError';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

const meta: Meta<typeof ApiResponseError> = {
  title: 'Organisms/Status/Collections/ApiResponseError',
  component: ApiResponseError,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  argTypes: {
    statusCode: {
      control: 'number',
      description: 'Eg. 400, 401, 403, 404, 500',
    },
  },
  args: {
    statusCode: 400,
  },
  decorators: (Story) => (
    <StatusWrapper>
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    </StatusWrapper>
  ),
};

export default meta;
type Story = StoryObj<typeof ApiResponseError>;

export const Default: Story = {
  args: {},
};
