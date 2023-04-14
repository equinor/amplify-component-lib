import { Meta, Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Feedback from './Feedback';

export default {
  title: 'Navigation/TopBar/Feedback',
  component: Feedback,
} as Meta;

export const Primary: Story = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Feedback />
    </QueryClientProvider>
  );
};
