import { Typography } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import StatusChip from './StatusChip';

export default {
  title: 'DataDisplay/Workflow/StatusChip',
  component: StatusChip,
  argTypes: {
    children: { control: 'text' },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    width: { control: 'text' },
  },
  args: {
    width: '200px',
    children: 'Draft',
    color: '#004088',
    backgroundColor: '#D5EAF4',
  },
} as Meta;

export const Primary: Story = (args) => (
  <StatusChip {...args} style={{ width: args.width }}>
    <Typography group="ui" variant="chip__badge">
      {args.children}
    </Typography>
  </StatusChip>
);
