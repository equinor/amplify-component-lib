import { Story, Meta } from '@storybook/react';
import WorkflowStatusBar, {
  WorkflowStatusBarProps,
} from '../../../components/Workflow/WorkflowStatusBar';

export default {
  title: 'WorkflowStatusBar',
  component: WorkflowStatusBar,
} as Meta;

const Template: Story<WorkflowStatusBarProps> = (args) => (
  <WorkflowStatusBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'Draft',
    },
    {
      label: 'Awaiting QA',
    },
    {
      label: 'Ready for QA',
    },
    {
      label: 'Author review',
    },
    {
      label: 'Awaiting approval',
    },
    {
      label: 'Approved',
    },
    {
      label: 'Published',
    },
  ],
};

export const HalfActive = Template.bind({});
HalfActive.args = {
  options: [
    { active: true },
    { active: true },
    { active: true },
    {},
    {},
    {},
    {},
  ],
};

export const AllActive = Template.bind({});
AllActive.args = {
  options: [
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
    { active: true },
  ],
};

export const DifferentColors = Template.bind({});
DifferentColors.args = {
  options: [
    { active: true, color: '#ff0000', backgroundColor: '#ff8484' },
    { active: true, color: '#008b2a', backgroundColor: '#77ff72' },
    { active: true, color: '#0f0097', backgroundColor: '#7a7bce' },
    { color: '#000000', backgroundColor: '#c7c7c7' },
    { color: '#ffe600', backgroundColor: '#d6d18e' },
    { color: '#ff00dd', backgroundColor: '#e489d8' },
    { color: '#00ffff', backgroundColor: '#b1fcff' },
  ],
};
