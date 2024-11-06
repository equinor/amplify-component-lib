import { Meta, StoryObj } from '@storybook/react';

import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Organisms/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=9434-152369&m=dev',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {},
};
