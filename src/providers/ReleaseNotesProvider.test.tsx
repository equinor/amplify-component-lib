import { renderHook } from '../tests/test-utils';
import ReleaseNotesProvider, {
  useReleaseNotes,
} from './ReleaseNotesProvider';

test('open = false works as expected', () => {
  const { result } = renderHook(() => useReleaseNotes(), {
    wrapper: ReleaseNotesProvider,
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
