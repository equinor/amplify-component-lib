import { MemoryRouter } from 'react-router';

import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Resources } from './Resources';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';

export default {
  title: 'Organisms/TopBar/Resources',
  component: Resources,
  argTypes: {
    hideFeedback: { control: 'boolean' },
    hideReleaseNotes: {
      control: 'boolean',
    },
    hideLearnMore: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description:
        'You can import ResourceMenuItem to use as one or more children to get a similar look to existing menu items',
    },
    field: {
      description: 'The field prop is used as metadata on feedback reports',
    },
  },
  args: {
    hideFeedback: false,
    hideReleaseNotes: false,
    hideLearnMore: false,
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <ReleaseNotesProvider>
            <MemoryRouter initialEntries={['/']}>
              <Resources {...args} />
            </MemoryRouter>
          </ReleaseNotesProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
