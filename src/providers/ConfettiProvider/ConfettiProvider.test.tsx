import { useConfetti } from './ConfettiProvider';
import { renderHook } from 'src/tests/browsertest-utils';

test('Throws error when using hook outside of context', async () => {
  expect(() => renderHook(() => useConfetti())).toThrow(
    'useConfetti must be used inside ConfettiProvider'
  );
});
