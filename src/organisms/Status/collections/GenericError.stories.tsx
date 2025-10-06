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
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  args: {},
  decorators: (Story) => (
    <StatusWrapper>
      <Story />
    </StatusWrapper>
  ),
};

export default meta;
type Story = StoryObj<typeof GenericError>;

export const Default: Story = {
  args: {},
};
