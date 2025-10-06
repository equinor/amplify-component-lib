import { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ApplicationDrawer } from './ApplicationDrawer';
import { FAKE_APPS } from 'src/tests/mockHandlers';

import { expect, userEvent } from 'storybook/test';

export default {
  title: 'Organisms/TopBar/ApplicationDrawer',
  component: ApplicationDrawer,
  decorators: (Story) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
} as Meta;

type Story = StoryObj<typeof ApplicationDrawer>;

export const Primary: Story = {};

export const ShowsExpected: Story = {
  play: async ({ canvas }) => {
    const menuButton = canvas.getByRole('button');

    await userEvent.click(menuButton);

    for (const app of FAKE_APPS) {
      await expect(await canvas.findByText(app.name)).toBeInTheDocument();
    }
  },
};
