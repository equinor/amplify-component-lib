import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryObj } from '@storybook/react';

import { PageNotFound } from './PageNotFound';

const meta: Meta<typeof PageNotFound> = {
  title: 'Organisms/Status/Collections/PageNotFound',
  component: PageNotFound,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
  decorators: (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {
  args: {},
};
