import { Typography } from '@equinor/eds-core-react';
import { Story, Meta } from '@storybook/react';
import StatusChip, {
  StatusChipProps,
} from '../../../components/Workflow/StatusChip';

export default {
  title: 'StatusChip',
  component: StatusChip,
} as Meta;

const Template: Story<StatusChipProps> = (args) => (
  <StatusChip {...args}>
    <Typography group="ui" variant="chip__badge">
      Draft
    </Typography>
  </StatusChip>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Draft',
};

export const Color = Template.bind({});
Color.args = {
  label: 'Draft',
  color: '#004088',
  backgroundColor: '#D5EAF4',
};

const IncreasedWidth: Story<StatusChipProps> = (args) => (
  <StatusChip {...args} style={{ width: '200px' }}>
    <Typography group="ui" variant="chip__badge">
      Reporting Overview
    </Typography>
  </StatusChip>
);

export const LongChip = IncreasedWidth.bind({});
LongChip.args = {
  label: 'Reporting Status',
  color: '#004088',
  backgroundColor: '#D5EAF4',
};

const LongText: Story<StatusChipProps> = (args) => (
  <div style={{ fontSize: '32px' }}>
    <StatusChip {...args} style={{ width: '400px' }}>
      <Typography group="heading" variant="h1">
        This is a long sentance to see how it looks
      </Typography>
    </StatusChip>
  </div>
);

export const ToLongWord = LongText.bind({});
ToLongWord.args = {
  label: 'This is a long sentance to see how it looks',
  color: '#004088',
  backgroundColor: '#D5EAF4',
};
