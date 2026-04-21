import { ReleaseNoteType } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Resources } from './Resources';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';
import { handlers } from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';

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
  parameters: {
    router: {
      initial: '/',
      routes: ['/'],
    },
    msw: {
      handlers: [
        http.get('*/api/v1/ReleaseNotes/:applicationName', async () => {
          return HttpResponse.json([
            {
              releaseId: faker.string.uuid(),
              applicationName: 'PWEX',
              version: null,
              title: faker.commerce.productName(),
              body: `<h5>Release notes body text</h5>
              ${faker.lorem
                .paragraphs(55, '<br>')
                .split('\n')
                .map((text) => `<p>${text}</p>`)}`,
              tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
              draft: false,
              createdDate: faker.date.past().toISOString(),
              releaseDate: new Date().toISOString(),
            },
          ]);
        }),
        ...handlers,
      ],
    },
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <ReleaseNotesProvider>
            <Resources {...args} />
          </ReleaseNotesProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
