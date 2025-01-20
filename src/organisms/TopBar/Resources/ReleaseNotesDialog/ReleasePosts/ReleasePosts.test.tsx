import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReleasePosts } from './ReleasePosts';
import { ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/browsertest-utils';

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
    </QueryClientProvider>
  );
}

test('Shows no available if there are no release notes', async () => {
  render(<ReleasePosts posts={[]} />, { wrapper: Wrappers });

  expect(screen.getByText(/No release notes available/i)).toBeInTheDocument();
});
