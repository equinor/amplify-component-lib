import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react-vite';

import { MissingPermissions } from './MissingPermissions';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

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
      <StatusWrapper>
        <Story />
      </StatusWrapper>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof MissingPermissions>;

export const Default: Story = {
  args: {},
};
