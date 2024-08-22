import { Meta, StoryObj } from '@storybook/react';

import { Dialog } from 'src/molecules/Dialog/Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
  args: {
    open: true,
    isDismissable: false,
    title: 'Dialog title',
    children: 'This is a dialog description',
    actions: [
      {
        variant: 'ghost',
        onClick: () => console.log('clicked'),
        text: 'Cancel',
      },
      {
        variant: 'outlined',
        onClick: () => console.log('clicked'),
        text: 'Continue',
      },
    ],
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=3009-34034&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {},
};
