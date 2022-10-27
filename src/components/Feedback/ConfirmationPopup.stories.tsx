import { Button } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import ConfirmationPopup, { ConfirmationPopupProps } from './ConfirmationPopup';

export default {
  title: 'Feedback/ConfirmationPopup',
  component: ConfirmationPopup,
  argTypes: {},
} as Meta;

const Template: Story<ConfirmationPopupProps> = (args) => {
  return <ConfirmationPopup {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  show: true,
  title: 'Title',
  body: 'This is the body',
  onClose: () => {
    alert('onClose called');
  },
  actions: [
    <Button key="A1" variant="ghost">
      Action
    </Button>,
    <Button key="A2">Action</Button>,
  ],
};
