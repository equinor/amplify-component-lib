import { Button } from "@equinor/eds-core-react";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";

import ConfirmationPopup, { IComponentProps } from ".";

export default {
  title: "Confirmation Popup",
  component: ConfirmationPopup,
  argTypes: {},
} as Meta;

const Template: Story<IComponentProps> = (args) => {
  const [shouldShow, setShouldShow] = useState(true);

  return (
    <ConfirmationPopup
      show={args.show}
      actions={[<Button variant="ghost" onClick={() => }>Close</Button>,
      <Button>Ok</Button>]}
      body={args.body}
      onClose={args.onClose}
    />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  title: "Title",
  body: "This is the body",
  onClose: (event, open) => {
    alert("onClose called");
  },
};
