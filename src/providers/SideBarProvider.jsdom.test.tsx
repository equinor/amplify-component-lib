import { useSideBar } from './SideBarProvider';
import { renderHook } from 'src/tests/jsdomtest-utils';

test("'useSideBar' hook throws error when used outside provider", () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useSideBar())).toThrowError(
    'Sidebar hook must be used within Provider'
  );
});
