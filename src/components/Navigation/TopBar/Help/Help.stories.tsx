import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import { AuthProvider, SnackbarProvider } from 'src/providers';

export default {
  title: 'Navigation/TopBar/Help',
  component: Help,
  argTypes: {
    applicationName: { control: 'text' },
  },
  args: {
    applicationName: 'test.com/',
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <SnackbarProvider>
          <Help applicationName={args.applicationName} />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
