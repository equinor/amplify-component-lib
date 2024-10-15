import { useState } from 'react';

import { Button } from '@equinor/eds-core-react';
import { arrow_back } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogProps } from 'src/molecules/Dialog/Dialog';
import { Story } from 'src/storybook';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function DialogStory(props: DialogProps) {
  const [open, setOpen] = useState(false);

  const actions = props.actions?.map((action) => ({
    ...action,
    onClick: () => setOpen(false),
  }));

  return (
    <Wrapper>
      <Button onClick={() => setOpen(true)}>Show dialog</Button>

      <Dialog
        {...props}
        open={open}
        actions={actions}
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
}

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: DialogStory,
  argTypes: {
    isDismissable: {
      description: 'If clicking outside/hitting "Esc" closes the dialog',
    },
    open: {
      description: 'Opens/Closes dialog',
    },
    withBorders: {
      control: 'boolean',
    },
    withContentPadding: {
      control: 'boolean',
    },
    dialogRef: {
      description: 'Ref to dialog element',
    },
    actions: {
      description: 'Buttons that will be shown at the bottom',
    },
  },
  args: {
    isDismissable: false,
    width: 500,
    title: 'Dialog title',
    children:
      'This is a dialog description, it can be however long or short you want',
    actions: [
      {
        variant: 'ghost',
        onClick: () => console.log('clicked'),
        text: 'Cancel',
        color: 'secondary',
      },
      {
        variant: 'outlined',
        onClick: () => console.log('clicked'),
        text: 'Continue',
        color: 'primary',
      },
    ],
    withBorders: false,
    withContentPadding: true,
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

export const WithBorders: Story = {
  args: {
    withBorders: true,
  },
};

export const WithoutContentPadding: Story = {
  args: {
    withContentPadding: false,
    children: <div>Wow! No padding!</div>,
  },
};

export const CenteredAction: Story = {
  args: {
    title: 'Central Dialog!',
    children: 'This dialog contains some information important for the user.',
    actions: [
      {
        position: 'center',
        text: 'Okay!',
        onClick: () => console.log('clicked'),
        variant: 'ghost',
      },
    ],
  },
};

export const DisabledActions: Story = {
  args: {
    title: 'Disabled actions dialog!',
    children: 'This dialog contains some information important for the user.',
    actions: [
      {
        text: 'Cancel',
        onClick: () => console.log('clicked'),
        variant: 'contained',
        disabled: true,
      },
      {
        text: 'Okay!',
        onClick: () => console.log('clicked'),
        variant: 'contained',
        disabled: 'This action is disabled',
      },
    ],
  },
};

export const isLoadingAction: Story = {
  args: {
    title: 'Disabled actions dialog!',
    children: 'This dialog contains some information important for the user.',
    actions: [
      {
        text: 'Cancel',
        onClick: () => console.log('clicked'),
        variant: 'contained',
      },
      {
        text: 'Okay!',
        onClick: () => console.log('clicked'),
        variant: 'contained',
        isLoading: true,
      },
    ],
  },
};

export const LeftAndRightActions: Story = {
  args: {
    title: 'Left and right dialog!',
    children: (
      <div>
        <p>One two three four</p>
        <p>いち、一、に、二、さん、三、よん、四</p>
      </div>
    ),
    actions: [
      {
        position: 'left',
        text: 'Back',
        icon: arrow_back,
        onClick: () => console.log('clicked'),
        variant: 'ghost',
      },
      {
        text: 'Cancel',
        onClick: () => console.log('clicked'),
        variant: 'ghost',
      },
      {
        text: 'Okay',
        onClick: () => console.log('clicked'),
        variant: 'contained',
      },
    ],
  },
};

export const ColorVariations: Story = {
  args: {
    actions: [
      {
        onClick: () => console.log('clicked'),
        text: 'Default (primary)',
      },
      {
        onClick: () => console.log('clicked'),
        text: 'Primary',
        color: 'primary',
      },
      {
        onClick: () => console.log('clicked'),
        text: 'Secondary',
        color: 'secondary',
      },
      {
        onClick: () => console.log('clicked'),
        text: 'Danger',
        color: 'danger',
      },
    ],
  },
};
