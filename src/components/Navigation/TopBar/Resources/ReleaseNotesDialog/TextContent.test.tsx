import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TextContent from './TextContent';
import { CancelablePromise } from 'src/api';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen, waitFor } from 'src/tests/test-utils';

const Wrappers = ({ children }: { children: any }) => {
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

const FAKE_TOKEN = 'FAKE_TOKEN';

vi.mock('src/api/services/ReleaseNotesService', () => {
  class ReleaseNotesService {
    public static getContainerSasUri(): CancelablePromise<any> {
      return new CancelablePromise((resolve) => {
        setTimeout(() => {
          resolve(`PORTALURL?${FAKE_TOKEN}`);
        }, 100);
      });
    }
  }
  return { ReleaseNotesService };
});

test('IMG src in TextContent gets token inserted on rendering', async () => {
  const ALT_TEXT = faker.animal.dog();
  const IMG_SRC = faker.image.url();
  const textWithImg =
    '<p>hei<br><br><br></p><img alt="' + ALT_TEXT + '" src="' + IMG_SRC + '"/>';

  render(<TextContent text={textWithImg} />, { wrapper: Wrappers });

  await waitFor(
    () =>
      expect(screen.getByAltText(ALT_TEXT)).toHaveAttribute(
        'src',
        `${IMG_SRC}?${FAKE_TOKEN}`
      ),
    { timeout: 200 }
  );
});
