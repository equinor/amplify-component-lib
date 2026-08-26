import { ComponentType, useRef, useState } from 'react';

import {
  Button,
  Icon,
  Popover,
  PopoverProps,
  Typography,
} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import page from './Popover.docs.mdx';
import { Stack } from 'src/storybook';

Icon.add({ close });

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  subcomponents: {
    Title: Popover.Title as ComponentType<unknown>,
    Header: Popover.Header as ComponentType<unknown>,
    Content: Popover.Content as ComponentType<unknown>,
    Actions: Popover.Actions as ComponentType<unknown>,
  },
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => (
      <Stack style={{ padding: '32px', minHeight: '300px' }}>
        <Story />
      </Stack>
    ),
  ],
};

export default meta;

export const Introduction: StoryFn<PopoverProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button ref={anchorRef} onClick={isOpen ? handleClose : handleOpen}>
        Click to open Popover
      </Button>
      <Popover
        {...args}
        open={isOpen}
        anchorEl={anchorRef.current}
        onClose={handleClose}
      >
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">
            This is the popover content.
          </Typography>
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={handleClose}>OK</Button>
        </Popover.Actions>
      </Popover>
    </>
  );
};

export const Placement: StoryFn<PopoverProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={anchorRef} onClick={() => setIsOpen(!isOpen)}>
        Open Top Popover
      </Button>
      <Popover
        open={isOpen}
        anchorEl={anchorRef.current}
        onClose={() => setIsOpen(false)}
        placement="top"
      >
        <Popover.Header>
          <Popover.Title>Top Placement</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">
            Popover positioned at the top of the anchor element.
          </Typography>
        </Popover.Content>
      </Popover>
    </>
  );
};
