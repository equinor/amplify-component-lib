import { useToasts } from 'src/providers/ToastProvider/ToastProvider';
import { renderHook } from 'src/tests/browsertest-utils';

test('this is the test', async () => {
  expect(() => renderHook(() => useToasts())).toThrow(
    'useToasts must be used within a ToastProvider'
  );
});
