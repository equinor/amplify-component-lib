import { useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { StoryFn } from '@storybook/react';

import ConfirmationPopup, {
  ConfirmationPopupProps,
} from 'src/deprecated/ConfirmationPopup';

export default {
  title: 'Deprecated/Feedback/ConfirmationPopup',
  component: ConfirmationPopup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19714&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
  argTypes: {
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
      description: 'Array with buttons',
    },
    width: {
      control: 'text',
    },
  },
  args: {
    title: 'This is the title',
    body: 'This is the body',
    width: '400px',
  },
};

export const Primary: StoryFn<ConfirmationPopupProps> = (args) => {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleOnClose = () => setShow(false);

  return (
    <>
      <Button onClick={handleOpen}>Open confirmation popup</Button>
      <ConfirmationPopup
        {...args}
        show={show}
        onClose={handleOnClose}
        actions={[
          <Button key="cancel" variant="ghost" onClick={handleOnClose}>
            Cancel
          </Button>,
          <Button key="continue " onClick={handleOnClose}>
            Continue
          </Button>,
        ]}
      />
    </>
  );
};
