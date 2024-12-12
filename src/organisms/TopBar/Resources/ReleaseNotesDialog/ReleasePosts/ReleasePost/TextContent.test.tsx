import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TextContent } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleasePosts/ReleasePost/TextContent';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen, waitFor } from 'src/tests/browsertest-utils';

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

test('TextContent shows text', async () => {
  const textWithImg = '<p>hei<br><br><br></p>';

  render(<TextContent text={textWithImg} />, { wrapper: Wrappers });

  await waitFor(() => expect(screen.getByText('hei')).toBeInTheDocument(), {
    timeout: 200,
  });
});
