import { canNavigate } from 'src/organisms/SideBar/MenuItem/MenuItem.utils';

test('canNavigate returns expected value', () => {
  // Top page of current page
  expect(
    canNavigate({
      isActive: true,
      disabled: false,
      replace: true,
    })
  ).toBe(true);

  // Disabled
  expect(
    canNavigate({
      isActive: true,
      disabled: true,
      replace: true,
    })
  ).toBe(false);
});
