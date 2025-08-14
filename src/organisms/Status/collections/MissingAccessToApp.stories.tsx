import { Meta, StoryObj } from '@storybook/react-vite';

import { MissingAccessToApp } from './MissingAccessToApp';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

const meta: Meta<typeof MissingAccessToApp> = {
  title: 'Organisms/Status/Collections/MissingAccessToApp',
  component: MissingAccessToApp,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
  decorators: (Story) => (
    <StatusWrapper>
      <Story />,
    </StatusWrapper>
  ),
};

export default meta;
type Story = StoryObj<typeof MissingAccessToApp>;

export const Default: Story = {
  args: {},
};
