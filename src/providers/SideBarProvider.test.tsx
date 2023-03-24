import { renderHook } from '../tests/test-utils';
import { useSideBar } from './SideBarProvider';

test("'useSideBar' hook throws error when used outside provider", () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useSideBar())).toThrowError(
    'Sidebar hook must be used within Provider'
  );
});
