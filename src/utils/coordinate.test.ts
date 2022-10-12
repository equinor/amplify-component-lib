import { faker } from '@faker-js/faker';

import coordinate from './coordinate';

const { formatLatLng, formatUtm } = coordinate;

test('Formats random location without crashing', () => {
  const latitude = Number(faker.address.latitude());
  const longitude = Number(faker.address.longitude());

  expect(formatLatLng(latitude)).toBeTruthy();
  expect(formatLatLng(longitude)).toBeTruthy();
});

test('Formats lat lng with correct amount of decimals', () => {
  const latitude = 58.123123123123;

  expect(formatLatLng(latitude)).toBe('58.1231231');
});

test('Formats utm correctly', () => {
  const easting = 234562.3457693845;
  const formatted = formatUtm(easting);
  expect(formatted).toBe('234562.34m');
});

test('Formats utm correctly with decimals', () => {
  const easting = 234562.3457693845;
  const formatted = formatUtm(easting, 4);
  expect(formatted).toBe('234562.3457m');
});
