import { Meta, Story } from '@storybook/react';

import WorkflowDescription, {
  WorkflowDescriptionProps,
} from './WorkflowDescription';

export default {
  title: 'DataDisplay/Workflow/WorkflowDescription',
  component: WorkflowDescription,
} as Meta;

const Template: Story<WorkflowDescriptionProps> = (args) => (
  <WorkflowDescription {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'Draft',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Awaiting QA',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Ready for QA',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Author review',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Awaiting approval',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Approved',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Published',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
  ],
};

export const Half = Template.bind({});
Half.args = {
  options: [
    {
      label: 'Draft',
      notApprovedLabel: 'To be draft',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Awaiting QA',
      notApprovedLabel: 'To be QA',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Ready for QA',
      notApprovedLabel: 'To be ready',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Author review',
      notApprovedLabel: 'To be reviewed',
      approvedUser: 'John Smith',
      approvedDate: '1. january, 2022',
    },
    {
      label: 'Awaiting approval',
      notApprovedLabel: 'To be approved',
    },
    {
      label: 'Approved',
      notApprovedLabel: 'To be approved',
    },
    {
      label: 'Published',
      notApprovedLabel: 'To be published',
    },
  ],
};
