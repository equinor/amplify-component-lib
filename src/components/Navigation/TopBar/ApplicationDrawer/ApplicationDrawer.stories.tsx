import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ApplicationDrawer from './ApplicationDrawer';

export default {
  title: 'Navigation/TopBar/ApplicationDrawer',
  component: ApplicationDrawer,
} as Meta;

export const Primary: StoryFn = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationDrawer />
    </QueryClientProvider>
  );
};
