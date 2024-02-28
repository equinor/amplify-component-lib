import { MemoryRouter } from 'react-router';

import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';

export default {
  title: 'Navigation/TopBar/Help',
  component: Help,
} as Meta;

export const Primary: StoryFn = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <ReleaseNotesProvider>
            <MemoryRouter initialEntries={['/']}>
              <Help />
            </MemoryRouter>
          </ReleaseNotesProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
