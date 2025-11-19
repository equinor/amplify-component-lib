import { useToasts } from 'src/providers/ToastProvider/ToastProvider';
import { renderHook } from 'src/tests/browsertest-utils';

test('Throws error when using hook outside of context', async () => {
  expect(() => renderHook(() => useToasts())).toThrow(
    'useToasts must be used within a ToastProvider'
  );
});
