import coordinate from '..';
import faker from 'faker';

const { formatLatLng, formatUtm } = coordinate;

test('Formats random location without crashing', () => {
  const latitude = Number(faker.address.latitude());
  const longitude = Number(faker.address.longitude());

  expect(formatLatLng(latitude, true)).toBeTruthy();
  expect(formatLatLng(longitude, false)).toBeTruthy();
});

test('Formats Northern latitude correctly', () => {
  const latitude = 74.2389;
  const formatted = formatLatLng(latitude, true);
  expect(formatted).toBe(`N 074° 23' 89.00"`);
});

test('Formats long Northern latitude correctly', () => {
  const latitude = 174.238912;
  const formatted = formatLatLng(latitude, true);
  expect(formatted).toBe(`N 174° 23' 89.12"`);
});

test('Only pads short Northern latitude correctly', () => {
  const latitude = 174.2389;
  const formatted = formatLatLng(latitude, true);
  expect(formatted).toBe(`N 174° 23' 89.00"`);
});

test('Formats Southern latitude correctly', () => {
  const latitude = -74.2389;
  const formatted = formatLatLng(latitude, true);
  expect(formatted).toBe(`S 074° 23' 89.00"`);
});

test('Formats Western longitude correctly', () => {
  const latitude = -74.2389;
  const formatted = formatLatLng(latitude, false);
  expect(formatted).toBe(`W 074° 23' 89.00"`);
});

test('Formats Easter longitude correctly', () => {
  const latitude = 124.489;
  const formatted = formatLatLng(latitude, false);
  expect(formatted).toBe(`E 124° 48' 90.00"`);
});

test('Formats short coordinate correctly', () => {
  const latitude = 124.4;
  const formatted = formatLatLng(latitude, false);
  expect(formatted).toBe(`E 124° 40' 00.00"`);
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
