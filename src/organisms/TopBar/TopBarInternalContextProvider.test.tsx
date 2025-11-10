import { useTopBarInternalContext } from 'src/organisms/TopBar/TopBarInternalContextProvider';
import { renderHook } from 'src/tests/browsertest-utils';

test('Throws error if trying to use outside of context', async () => {
  expect(() => renderHook(() => useTopBarInternalContext())).toThrow();
});
