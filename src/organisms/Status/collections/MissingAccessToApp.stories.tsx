import { Meta, StoryObj } from '@storybook/react';

import { MissingAccessToApp } from './MissingAccessToApp';

const meta: Meta<typeof MissingAccessToApp> = {
  title: 'Organisms/Status/Collections/MissingAccessToApp',
  component: MissingAccessToApp,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof MissingAccessToApp>;

export const Default: Story = {
  args: {},
};
