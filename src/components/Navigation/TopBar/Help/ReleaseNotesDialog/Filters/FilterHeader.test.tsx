import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FilterHeader from './FilterHeader';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen } from 'src/tests/test-utils';

const Wrappers = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <MemoryRouter initialEntries={['/']}>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

test('should render filter header correctly', () => {
  render(<FilterHeader />, {
    wrapper: Wrappers,
  });

  const actual = screen.getByText('Filter by');
  expect(actual).toBeInTheDocument();
  expect(actual).toBeVisible();
});
