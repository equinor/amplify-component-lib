import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import StatusChip from './StatusChip';

export default {
  title: 'Data Display/Workflow/StatusChip',
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

export const Primary: StoryFn = (args) => (
  <StatusChip {...args} style={{ width: args.width }}>
    <Typography group="ui" variant="chip__badge">
      {args.children}
    </Typography>
  </StatusChip>
);
