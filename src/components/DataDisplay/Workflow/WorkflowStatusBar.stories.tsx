import { Story, Meta } from '@storybook/react';
import WorkflowStatusBar, {
  WorkflowStatusBarProps,
} from './WorkflowStatusBar';

export default {
  title: 'DataDisplay/Workflow/WorkflowStatusBar',
  component: WorkflowStatusBar,
} as Meta;

const Template: Story<WorkflowStatusBarProps> = (args) => (
  <div style={{ fontSize: '16px' }}>
    <WorkflowStatusBar {...args} />
  </div>
);

const options = [
  {
    label: 'Draft',
    value: 'draft',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Awaiting QA',
    value: 'awaitingQA',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Ready for QA',
    value: 'readyForQA',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Author review',
    value: 'authorReview',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Awaiting approval',
    value: 'awaitingApproval',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Approved',
    value: 'approved',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  {
    label: 'Published',
    value: 'published',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  activeNode: 'draft',
  showAlert: true,
  options: options,
};

export const HalfActive = Template.bind({});
HalfActive.args = {
  activeNode: 'authorReview',
  options: options,
};

export const AllActive = Template.bind({});
AllActive.args = {
  activeNode: 'published',
  options: options,
};

export const DifferentColors = Template.bind({});
DifferentColors.args = {
  activeNode: '4',
  options: [
    { label: 'One', value: '1', color: '#ff0000', backgroundColor: '#ff8484' },
    { label: 'Two', value: '2', color: '#008b2a', backgroundColor: '#77ff72' },
    {
      label: 'Three',
      value: '3',
      color: '#0f0097',
      backgroundColor: '#7a7bce',
    },
    { label: 'Four', value: '4', color: '#000000', backgroundColor: '#c7c7c7' },
    { label: 'Five', value: '5', color: '#ffe600', backgroundColor: '#d6d18e' },
    { label: 'Six', value: '6', color: '#ff00dd', backgroundColor: '#e489d8' },
    {
      label: 'Seven',
      value: '7',
      color: '#00ffff',
      backgroundColor: '#b1fcff',
    },
  ],
};
