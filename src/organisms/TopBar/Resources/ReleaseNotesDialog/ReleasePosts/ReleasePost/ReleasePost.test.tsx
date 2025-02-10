import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { formatDate } from 'src/atoms';
import { ReleaseNoteType } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesTypes/ReleaseNotesTypes.types';
import { ReleasePost } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleasePosts/ReleasePost/ReleasePost';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/browsertest-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should render a release post', () => {
  const releaseId = faker.string.uuid();
  const appName = faker.animal.bear();
  const body = faker.lorem.paragraph();
  const title = faker.lorem.sentence();
  const tags = [ReleaseNoteType.FEATURE];
  const createdDate = faker.date.anytime().toISOString();
  const version = faker.animal.cat();
  render(
    <ReleasePost
      draft={false}
      releaseId={releaseId}
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

test('showing release date if it has it', () => {
  const releaseId = faker.string.uuid();
  const appName = faker.animal.bear();
  const body = faker.lorem.paragraph();
  const title = faker.lorem.sentence();
  const tags = [ReleaseNoteType.FEATURE];
  const createdDate = faker.date.past().toISOString();
  const releaseDate = faker.date.future().toISOString();
  const version = faker.animal.cat();
  render(
    <ReleasePost
      draft={false}
      releaseId={releaseId}
      applicationName={appName}
      body={body}
      title={title}
      tags={tags}
      createdDate={createdDate}
      releaseDate={releaseDate}
      version={version}
    />,
    {
      wrapper: Wrappers,
    }
  );

  expect(
    screen.getByText(formatDate(releaseDate, { format: 'DD. month YYYY' }))
  ).toBeInTheDocument();
});

test('Calls on img read as expect', async () => {
  const releaseId = faker.string.uuid();
  const appName = faker.animal.bear();
  const body =
    '<p>text here</p><img src="someRandomImage.jpg" alt="imageAltTag">';
  const title = faker.lorem.sentence();
  const tags = [ReleaseNoteType.FEATURE];
  const createdDate = faker.date.anytime().toISOString();
  const version = faker.animal.cat();
  render(
    <ReleasePost
      draft={false}
      releaseId={releaseId}
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

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('Calls on img read as expect with url image src', async () => {
  const releaseId = faker.string.uuid();
  const appName = faker.animal.bear();
  const body = `<p>text here</p><img src="${faker.image.url()}" alt="imageAltTag">`;
  const title = faker.lorem.sentence();
  const tags = [ReleaseNoteType.FEATURE];
  const createdDate = faker.date.anytime().toISOString();
  const version = faker.animal.cat();
  render(
    <ReleasePost
      draft={false}
      releaseId={releaseId}
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

  expect(screen.getByRole('img')).toBeInTheDocument();
});
