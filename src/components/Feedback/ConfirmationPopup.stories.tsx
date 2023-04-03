import { Button } from '@equinor/eds-core-react';
import { Story } from '@storybook/react';

import ConfirmationPopup, { ConfirmationPopupProps } from './ConfirmationPopup';

export default {
  title: 'Feedback/ConfirmationPopup',
  component: ConfirmationPopup,
  argTypes: {
    show: { control: 'boolean' },
    title: {
      control: 'text',
    },
    body: {
      control: 'text',
    },
    onClose: {
      action: 'Ran onClose',
    },
    actions: {
      control: 'array',
    },
    width: {
      control: 'text',
    },
  },
  args: {
    show: true,
    title: 'This is the title',
    body: 'This is the body',
    actions: [
      <Button key="A1" variant="ghost" color="secondary">
        Cancel
      </Button>,
      <Button key="A2">Action</Button>,
    ],
    width: '400px',
  },
};

export const Primary: Story<ConfirmationPopupProps> = (args) => {
  return <ConfirmationPopup {...args} />;
};
