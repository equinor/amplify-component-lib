import { faker } from '@faker-js/faker';

import {
  canNavigate,
  isCurrentUrl,
} from 'src/organisms/SideBar/MenuItem/MenuItem.utils';

describe('isCurrentUrl', () => {
  test('should return true if currentUrl is equal to link', () => {
    const currentUrl = `/${faker.animal.bear()}`;
    expect(isCurrentUrl({ currentUrl, link: currentUrl })).toBeTruthy();
  });

  test('should return false if currentUrl is not equal to link', () => {
    const currentUrl = `/${faker.animal.bear()}`;
    const link = `/${faker.animal.snake()}`;
    expect(isCurrentUrl({ currentUrl, link })).toBeFalsy();
  });

  test('should return true if currentUrl is equal to link and its /', () => {
    const currentUrl = `/`;
    expect(isCurrentUrl({ currentUrl, link: currentUrl })).toBeTruthy();
  });
});

test('canNavigate returns expected value', () => {
  const url = '/hei/ho';

  // Top page of current page
  expect(
    canNavigate({
      currentUrl: url,
      link: '/hei',
      disabled: false,
      replace: true,
    })
  ).toBe(true);

  // Disabled
  expect(
    canNavigate({
      currentUrl: faker.internet.url(),
      link: url,
      disabled: true,
      replace: true,
    })
  ).toBe(false);
});
