import { Story, Meta } from '@storybook/react';
import StatusChip, {
  StatusChipProps,
} from '../../../components/Workflow/StatusChip';

export default {
  title: 'StatusChip',
  component: StatusChip,
} as Meta;

const Template: Story<StatusChipProps> = (args) => <StatusChip {...args} />;

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
