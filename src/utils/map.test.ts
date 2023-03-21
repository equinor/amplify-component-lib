import { faker } from '@faker-js/faker';

import map from './map';

test('distanceLatLng works as expected', () => {
  const firstLocation = {
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
  };
  const secondLocation = faker.address.nearbyGPSCoordinate(
    [firstLocation.lat, firstLocation.lng],
    10,
    true
  );

  expect(
    map.distanceLatLng(firstLocation, {
      lat: Number(secondLocation[0]),
      lng: Number(secondLocation[1]),
    })
  ).toBeLessThanOrEqual(10);
});

test('convertUtmToLatLng works as expected', () => {
  const utmCoordinate = {
    x: 431400,
    y: 6537900,
  };
  const converted = map.convertUtmToLatLng(utmCoordinate.x, utmCoordinate.y);

  const expectedLatLng = { lat: 58.973227394399274, lng: 1.8052774673154197 };

  expect(converted).toStrictEqual(expectedLatLng);
});

test('convertLatLngToUtm works as expected', () => {
  const latLng = { lat: 58.973227394399274, lng: 1.8052774673154197 };
  const converted = map.convertLatLngToUtm(latLng);

  const expectedUtm = [431400, 6537900];

  /// The conversion includes a lot of decimals which is why we round it to the nearest whole number
  expect(Math.round(converted[0])).toBe(expectedUtm[0]);
  expect(Math.round(converted[1])).toBe(expectedUtm[1]);
});
