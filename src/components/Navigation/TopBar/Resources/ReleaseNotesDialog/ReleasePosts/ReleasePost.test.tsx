import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleaseNoteType } from '../ReleaseNotesTypes/ReleaseNotesTypes.types';
import ReleasePost from './ReleasePost';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/test-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <MemoryRouter>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should render a release post', () => {
  const appName = faker.animal.bear();
  const body = faker.lorem.paragraph();
  const title = faker.lorem.sentence();
  const tags = [ReleaseNoteType.FEATURE];
  const createdDate = faker.date.anytime().toISOString();
  const version = faker.animal.cat();
  render(
    <ReleasePost
      applicationName={appName}
      body={body}
      title={title}
      tags={tags}
      createdDate={createdDate}
      version={version}
    />,
    {
      wrapper: Wrappers,
    }
  );

  const actual = screen.getByText(title);
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});
