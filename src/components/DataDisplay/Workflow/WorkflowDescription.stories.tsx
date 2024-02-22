import { Meta, StoryFn } from '@storybook/react';

import WorkflowDescription, {
  WorkflowDescriptionProps,
} from './WorkflowDescription';

export default {
  title: 'Data Display/Workflow/WorkflowDescription',
  component: WorkflowDescription,
} as Meta;

const Template: StoryFn<WorkflowDescriptionProps> = (args) => (
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
    { label: 'Awaiting approval', notApprovedLabel: 'To be approved' },
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
