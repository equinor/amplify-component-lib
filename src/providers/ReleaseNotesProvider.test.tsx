import { FC } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook } from '../tests/test-utils';
import ReleaseNotesProvider, { useReleaseNotes } from './ReleaseNotesProvider';

const Wrappers: FC<{ children: any }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
    </QueryClientProvider>
  );
};

test('open = false works as expected', () => {
  const { result } = renderHook(() => useReleaseNotes(), {
    wrapper: Wrappers,
  });

  expect(result.current.open).toBe(false);
});

test("'useReleaseNotes' hook throws error if using outside of context", () => {
  // Hides console errors since this test explicitly tests for thrown errors
  console.error = vi.fn();
  expect(() => renderHook(() => useReleaseNotes())).toThrow(
    'useReleaseNotes must be used within a ReleaseNotesProvider'
  );
});
