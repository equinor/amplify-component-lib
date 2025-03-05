import { faker } from '@faker-js/faker';

import { isCurrentUrl } from 'src/organisms/SideBar/MenuItem/MenuItem.utils';

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
