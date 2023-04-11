import { Icon } from '@equinor/eds-core-react';
import { folder } from '@equinor/eds-icons';
import { Meta, Story } from '@storybook/react';

import OptionalTooltip from './OptionalTooltip';

export default {
  title: 'DataDisplay/OptionalTooltip',
  component: OptionalTooltip,
  argTypes: { title: { control: 'text' } },
  args: { title: 'Optional tooltip title' },
} as Meta;

export const Primary: Story = (args) => (
  <OptionalTooltip {...args}>
    <Icon data={folder} />
  </OptionalTooltip>
);
